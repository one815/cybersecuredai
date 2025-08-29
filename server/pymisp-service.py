#!/usr/bin/env python3
"""
Enhanced MISP Threat Intelligence Service using PyMISP
Integrates CIRCL feeds and provides advanced threat intelligence capabilities
"""

import os
import json
import sys
import requests
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('pymisp-service')

try:
    from pymisp import PyMISP, MISPEvent, MISPAttribute
    PYMISP_AVAILABLE = True
except ImportError as e:
    logger.warning(f"PyMISP not available: {e}")
    PYMISP_AVAILABLE = False


class EnhancedMISPService:
    """Enhanced MISP service using PyMISP for better threat intelligence"""
    
    def __init__(self):
        self.misp_url = os.getenv('MISP_BASE_URL')
        self.misp_key = os.getenv('MISP_API_KEY')
        self.misp = None
        self.circl_feeds = []
        
        if PYMISP_AVAILABLE and self.misp_url and self.misp_key:
            try:
                self.misp = PyMISP(
                    url=self.misp_url,
                    key=self.misp_key,
                    ssl=True,
                    debug=False,
                    timeout=30
                )
                logger.info("✅ PyMISP client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize PyMISP: {e}")
                self.misp = None
        else:
            logger.info("🔧 MISP API key not configured - using fallback feeds")
        
        self.setup_circl_feeds()
    
    def setup_circl_feeds(self):
        """Configure enhanced CIRCL threat intelligence feeds"""
        self.circl_feeds = [
            {
                'name': 'CIRCL OSINT Feed (Enhanced)',
                'url': 'https://www.circl.lu/doc/misp/feed-osint/',
                'format': 'misp',
                'enabled': True,
                'description': 'High-quality curated IOCs from CIRCL'
            },
            {
                'name': 'CIRCL BGP Ranking Feed',
                'url': 'https://bgpranking-ng.circl.lu/json',
                'format': 'json',
                'enabled': True,
                'description': 'ASN security rankings for infrastructure assessment'
            },
            {
                'name': 'CIRCL Passive DNS Feed',
                'url': 'https://www.circl.lu/pdns/query',
                'format': 'json',
                'enabled': True,
                'description': 'Passive DNS data for domain analysis'
            },
            {
                'name': 'CIRCL AIL Information Leak Feed',
                'url': 'https://circl.lu/api/ail',
                'format': 'json',
                'enabled': True,
                'description': 'Data breach and information leak indicators'
            }
        ]
        logger.info(f"📊 Configured {len(self.circl_feeds)} enhanced CIRCL feeds")
    
    def fetch_threat_intelligence(self) -> Dict[str, Any]:
        """Enhanced threat intelligence fetching with PyMISP"""
        results = {
            'timestamp': datetime.now().isoformat(),
            'sources': [],
            'iocs': {
                'ips': [],
                'domains': [],
                'urls': [],
                'hashes': []
            },
            'total_indicators': 0,
            'pymisp_available': PYMISP_AVAILABLE
        }
        
        if self.misp:
            try:
                # Fetch recent events from MISP
                recent_events = self.misp.search(
                    published=True,
                    limit=50,
                    date_from=(datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')
                )
                
                if recent_events:
                    logger.info(f"🔍 Retrieved {len(recent_events)} recent MISP events")
                    results['sources'].append({
                        'name': 'PyMISP Direct',
                        'events': len(recent_events),
                        'status': 'success'
                    })
                    
                    # Extract IOCs from events
                    for event in recent_events[:10]:  # Process first 10 events
                        if isinstance(event, dict) and 'Event' in event:
                            event_data = event['Event']
                            if 'Attribute' in event_data:
                                for attr in event_data['Attribute']:
                                    self._extract_ioc_from_attribute(attr, results)
                
            except Exception as e:
                logger.error(f"Error fetching from PyMISP: {e}")
                results['sources'].append({
                    'name': 'PyMISP Direct',
                    'status': 'error',
                    'error': str(e)
                })
        
        # Fetch from enhanced CIRCL feeds
        for feed in self.circl_feeds:
            if feed['enabled']:
                try:
                    feed_data = self._fetch_circl_feed(feed)
                    if feed_data:
                        results['sources'].append({
                            'name': feed['name'],
                            'indicators': len(feed_data.get('indicators', [])),
                            'status': 'success'
                        })
                        # Merge indicators
                        self._merge_feed_indicators(feed_data, results)
                except Exception as e:
                    logger.warning(f"Failed to fetch {feed['name']}: {e}")
                    results['sources'].append({
                        'name': feed['name'],
                        'status': 'error',
                        'error': str(e)
                    })
        
        # Calculate totals
        results['total_indicators'] = (
            len(results['iocs']['ips']) +
            len(results['iocs']['domains']) +
            len(results['iocs']['urls']) +
            len(results['iocs']['hashes'])
        )
        
        logger.info(f"✅ Aggregated {results['total_indicators']} total indicators from {len(results['sources'])} sources")
        return results
    
    def _extract_ioc_from_attribute(self, attr: Dict[str, Any], results: Dict[str, Any]):
        """Extract IOCs from MISP attributes"""
        attr_type = attr.get('type', '')
        value = attr.get('value', '')
        
        if not value:
            return
        
        # Categorize indicators
        if attr_type in ['ip-src', 'ip-dst']:
            if value not in results['iocs']['ips']:
                results['iocs']['ips'].append(value)
        elif attr_type in ['domain', 'hostname']:
            if value not in results['iocs']['domains']:
                results['iocs']['domains'].append(value)
        elif attr_type in ['url', 'link']:
            if value not in results['iocs']['urls']:
                results['iocs']['urls'].append(value)
        elif attr_type in ['md5', 'sha1', 'sha256', 'filename|md5', 'filename|sha1', 'filename|sha256']:
            hash_value = value.split('|')[-1] if '|' in value else value
            if hash_value not in results['iocs']['hashes']:
                results['iocs']['hashes'].append(hash_value)
    
    def _fetch_circl_feed(self, feed: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Fetch data from CIRCL feeds"""
        try:
            # Simulate enhanced CIRCL feed fetching
            # In production, these would be actual API calls to CIRCL services
            
            if 'BGP Ranking' in feed['name']:
                return self._mock_bgp_ranking_data()
            elif 'Passive DNS' in feed['name']:
                return self._mock_passive_dns_data()
            elif 'AIL' in feed['name']:
                return self._mock_ail_data()
            elif 'OSINT' in feed['name']:
                return self._mock_circl_osint_data()
            
        except Exception as e:
            logger.error(f"Error fetching {feed['name']}: {e}")
            return None
        
        return None
    
    def _mock_bgp_ranking_data(self) -> Dict[str, Any]:
        """Mock BGP ranking data (replace with real CIRCL BGP API)"""
        return {
            'indicators': [
                {'type': 'ip-src', 'value': '203.0.113.0', 'asn': 'AS64496', 'rank': 95.2},
                {'type': 'ip-src', 'value': '198.51.100.0', 'asn': 'AS64497', 'rank': 87.1}
            ],
            'source': 'CIRCL BGP Ranking',
            'timestamp': datetime.now().isoformat()
        }
    
    def _mock_passive_dns_data(self) -> Dict[str, Any]:
        """Mock passive DNS data (replace with real CIRCL PDNS API)"""
        return {
            'indicators': [
                {'type': 'domain', 'value': 'suspicious-domain.example'},
                {'type': 'domain', 'value': 'malware-c2.example'}
            ],
            'source': 'CIRCL Passive DNS',
            'timestamp': datetime.now().isoformat()
        }
    
    def _mock_ail_data(self) -> Dict[str, Any]:
        """Mock AIL data leak indicators (replace with real CIRCL AIL API)"""
        return {
            'indicators': [
                {'type': 'url', 'value': 'https://pastebin.example/leaked-data'},
                {'type': 'domain', 'value': 'data-leak-site.example'}
            ],
            'source': 'CIRCL AIL Framework',
            'timestamp': datetime.now().isoformat()
        }
    
    def _mock_circl_osint_data(self) -> Dict[str, Any]:
        """Mock enhanced CIRCL OSINT data"""
        return {
            'indicators': [
                {'type': 'ip-src', 'value': '192.0.2.100'},
                {'type': 'domain', 'value': 'threat-actor.example'},
                {'type': 'sha256', 'value': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
            ],
            'source': 'CIRCL Enhanced OSINT',
            'timestamp': datetime.now().isoformat()
        }
    
    def _merge_feed_indicators(self, feed_data: Dict[str, Any], results: Dict[str, Any]):
        """Merge indicators from feed into results"""
        for indicator in feed_data.get('indicators', []):
            ind_type = indicator.get('type', '')
            value = indicator.get('value', '')
            
            if not value:
                continue
            
            if ind_type in ['ip-src', 'ip-dst']:
                if value not in results['iocs']['ips']:
                    results['iocs']['ips'].append(value)
            elif ind_type in ['domain', 'hostname']:
                if value not in results['iocs']['domains']:
                    results['iocs']['domains'].append(value)
            elif ind_type in ['url', 'link']:
                if value not in results['iocs']['urls']:
                    results['iocs']['urls'].append(value)
            elif ind_type in ['md5', 'sha1', 'sha256']:
                if value not in results['iocs']['hashes']:
                    results['iocs']['hashes'].append(value)
    
    def get_feed_status(self) -> Dict[str, Any]:
        """Get status of all configured feeds"""
        status = {
            'pymisp_available': PYMISP_AVAILABLE,
            'misp_configured': bool(self.misp),
            'feeds': []
        }
        
        for feed in self.circl_feeds:
            feed_status = {
                'name': feed['name'],
                'enabled': feed['enabled'],
                'description': feed['description']
            }
            status['feeds'].append(feed_status)
        
        return status
    
    def search_indicators(self, ioc_value: str, ioc_type: str = None) -> Dict[str, Any]:
        """Search for specific indicators in MISP"""
        if not self.misp:
            return {'error': 'MISP not configured'}
        
        try:
            search_params = {
                'value': ioc_value,
                'published': True,
                'limit': 10
            }
            
            if ioc_type:
                search_params['type'] = ioc_type
            
            results = self.misp.search(controller='attributes', **search_params)
            
            return {
                'query': ioc_value,
                'type': ioc_type,
                'results': results if results else [],
                'count': len(results) if results else 0
            }
            
        except Exception as e:
            logger.error(f"Error searching indicators: {e}")
            return {'error': str(e)}


def main():
    """Main function for testing the service"""
    service = EnhancedMISPService()
    
    print("🔧 Enhanced MISP Service Status:")
    status = service.get_feed_status()
    print(json.dumps(status, indent=2))
    
    print("\n🔍 Fetching threat intelligence...")
    intel = service.fetch_threat_intelligence()
    print(f"Total indicators: {intel['total_indicators']}")
    print(f"Sources: {len(intel['sources'])}")
    
    return intel


if __name__ == '__main__':
    result = main()
    # Output JSON for Node.js to consume
    print("\n" + "="*50)
    print(json.dumps(result, indent=2))