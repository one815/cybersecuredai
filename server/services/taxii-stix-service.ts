import axios from 'axios';
import { spawn } from 'child_process';
import path from 'path';

// STIX 2.1 Object Types
export type StixObjectType = 
  | 'attack-pattern'
  | 'campaign' 
  | 'course-of-action'
  | 'grouping'
  | 'identity'
  | 'incident'
  | 'indicator'
  | 'infrastructure'
  | 'intrusion-set'
  | 'location'
  | 'malware'
  | 'malware-analysis'
  | 'note'
  | 'observed-data'
  | 'opinion'
  | 'report'
  | 'threat-actor'
  | 'tool'
  | 'vulnerability';

export interface StixObject {
  type: StixObjectType;
  spec_version: '2.1';
  id: string;
  created: string;
  modified: string;
  created_by_ref?: string;
  revoked?: boolean;
  labels?: string[];
  external_references?: ExternalReference[];
  object_marking_refs?: string[];
  granular_markings?: GranularMarking[];
  extensions?: { [key: string]: any };
  [key: string]: any;
}

export interface ExternalReference {
  source_name: string;
  description?: string;
  url?: string;
  hashes?: { [key: string]: string };
  external_id?: string;
}

export interface GranularMarking {
  lang?: string;
  marking_ref?: string;
  selectors: string[];
}

export interface TaxiiCollection {
  id: string;
  title: string;
  description?: string;
  alias?: string;
  can_read: boolean;
  can_write: boolean;
  media_types: string[];
}

export interface TaxiiDiscovery {
  title: string;
  description?: string;
  contact?: string;
  api_roots: string[];
  default?: string;
}

export interface TaxiiApiRoot {
  title: string;
  description?: string;
  versions: string[];
  max_content_length: number;
}

export interface TaxiiServer {
  id: string;
  name: string;
  url: string;
  username?: string;
  password?: string;
  api_key?: string;
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
  collections?: TaxiiCollection[];
  cisaCompliant: boolean;
}

export class TaxiiStixService {
  private servers: Map<string, TaxiiServer> = new Map();
  private readonly stixCache: Map<string, StixObject[]> = new Map();

  constructor() {
    this.initializeCisaCompliantServers();
  }

  /**
   * Initialize CISA compliant TAXII servers
   */
  private initializeCisaCompliantServers() {
    // MITRE ATT&CK TAXII Server (CISA recommended)
    this.servers.set('mitre-attack', {
      id: 'mitre-attack',
      name: 'MITRE ATT&CK TAXII Server',
      url: 'https://cti-taxii.mitre.org',
      status: 'active',
      cisaCompliant: true,
      collections: []
    });

    // CISA AIS (Automated Indicator Sharing) - if available
    this.servers.set('cisa-ais', {
      id: 'cisa-ais',
      name: 'CISA Automated Indicator Sharing',
      url: 'https://ais.cisa.dhs.gov/taxii2',
      status: 'inactive', // Requires authentication
      cisaCompliant: true,
      collections: []
    });

    console.log('🔧 TAXII/STIX Service initialized with CISA compliant servers');
  }

  /**
   * Add new TAXII server
   */
  async addTaxiiServer(server: Omit<TaxiiServer, 'collections' | 'status'>): Promise<void> {
    try {
      const newServer: TaxiiServer = {
        ...server,
        collections: [],
        status: 'inactive'
      };

      // Test connection
      const isConnected = await this.testServerConnection(server.url, server.username, server.password);
      newServer.status = isConnected ? 'active' : 'error';

      if (isConnected) {
        // Fetch collections
        newServer.collections = await this.getCollections(server.url, server.username, server.password);
      }

      this.servers.set(server.id, newServer);
      console.log(`✅ TAXII server '${server.name}' added successfully`);
    } catch (error) {
      console.error('❌ Failed to add TAXII server:', error);
      throw new Error(`Failed to add TAXII server: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Test TAXII server connection
   */
  async testServerConnection(url: string, username?: string, password?: string): Promise<boolean> {
    try {
      const headers = {
        'Accept': 'application/taxii+json;version=2.1',
        'Content-Type': 'application/taxii+json;version=2.1'
      };

      const auth = username && password ? { username, password } : undefined;

      const response = await axios.get(`${url}/taxii2/`, {
        headers,
        auth,
        timeout: 10000
      });

      return response.status === 200;
    } catch (error) {
      console.error('TAXII server connection test failed:', error);
      return false;
    }
  }

  /**
   * Get TAXII server discovery information
   */
  async getDiscovery(serverId: string): Promise<TaxiiDiscovery | null> {
    const server = this.servers.get(serverId);
    if (!server) {
      throw new Error(`TAXII server '${serverId}' not found`);
    }

    try {
      const headers = {
        'Accept': 'application/taxii+json;version=2.1'
      };

      const auth = server.username && server.password 
        ? { username: server.username, password: server.password }
        : undefined;

      const response = await axios.get(`${server.url}/taxii2/`, {
        headers,
        auth,
        timeout: 15000
      });

      return response.data as TaxiiDiscovery;
    } catch (error) {
      console.error(`Failed to get discovery from TAXII server '${serverId}':`, error);
      return null;
    }
  }

  /**
   * Get TAXII collections
   */
  async getCollections(url: string, username?: string, password?: string): Promise<TaxiiCollection[]> {
    try {
      // First get discovery to find API roots
      const discovery = await this.getDiscoveryDirect(url, username, password);
      if (!discovery || !discovery.api_roots.length) {
        return [];
      }

      const apiRoot = discovery.api_roots[0]; // Use first API root
      const headers = {
        'Accept': 'application/taxii+json;version=2.1'
      };

      const auth = username && password ? { username, password } : undefined;

      const response = await axios.get(`${url}${apiRoot}/collections/`, {
        headers,
        auth,
        timeout: 15000
      });

      return response.data.collections || [];
    } catch (error) {
      console.error('Failed to get TAXII collections:', error);
      return [];
    }
  }

  /**
   * Get discovery information directly
   */
  private async getDiscoveryDirect(url: string, username?: string, password?: string): Promise<TaxiiDiscovery | null> {
    try {
      const headers = {
        'Accept': 'application/taxii+json;version=2.1'
      };

      const auth = username && password ? { username, password } : undefined;

      const response = await axios.get(`${url}/taxii2/`, {
        headers,
        auth,
        timeout: 15000
      });

      return response.data as TaxiiDiscovery;
    } catch (error) {
      console.error('Failed to get TAXII discovery:', error);
      return null;
    }
  }

  /**
   * Fetch STIX objects from TAXII collection
   */
  async getStixObjects(
    serverId: string, 
    collectionId: string, 
    filters?: {
      type?: string;
      added_after?: string;
      limit?: number;
    }
  ): Promise<StixObject[]> {
    const server = this.servers.get(serverId);
    if (!server) {
      throw new Error(`TAXII server '${serverId}' not found`);
    }

    try {
      // Use Python client for reliable STIX 2.1 parsing
      return await this.fetchStixObjectsPython(server, collectionId, filters);
    } catch (error) {
      console.error('Failed to fetch STIX objects:', error);
      // Fallback to JavaScript implementation
      return await this.fetchStixObjectsJavaScript(server, collectionId, filters);
    }
  }

  /**
   * Fetch STIX objects using Python TAXII2 client
   */
  private async fetchStixObjectsPython(
    server: TaxiiServer,
    collectionId: string,
    filters?: { type?: string; added_after?: string; limit?: number }
  ): Promise<StixObject[]> {
    return new Promise((resolve, reject) => {
      const cacheKey = `${server.id}-${collectionId}`;
      
      // Check cache first
      if (this.stixCache.has(cacheKey)) {
        const cached = this.stixCache.get(cacheKey)!;
        resolve(this.applyFilters(cached, filters));
        return;
      }

      const pythonScript = `
import json
import sys
from taxii2client.v21 import Collection, Server
try:
    server = Server("${server.url}/taxii2/", user="${server.username || ''}", password="${server.password || ''}")
    api_root = server.api_roots[0]
    collection = Collection("${server.url}" + api_root.url + f"collections/${collectionId}/", user="${server.username || ''}", password="${server.password || ''}")
    
    objects = collection.get_objects()
    stix_objects = []
    
    if hasattr(objects, 'objects'):
        for obj in objects.objects:
            stix_objects.append(obj.serialize())
    else:
        # Handle different response formats
        if isinstance(objects, dict) and 'objects' in objects:
            stix_objects = objects['objects']
        elif isinstance(objects, list):
            stix_objects = objects
    
    print(json.dumps(stix_objects))
except Exception as e:
    print(json.dumps({"error": str(e)}), file=sys.stderr)
    sys.exit(1)
`;

      const python = spawn('python3', ['-c', pythonScript]);
      let output = '';
      let errorOutput = '';

      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      python.on('close', (code) => {
        if (code !== 0) {
          console.error('Python TAXII client error:', errorOutput);
          reject(new Error(`Python TAXII client failed: ${errorOutput}`));
          return;
        }

        try {
          const result = JSON.parse(output);
          if (result.error) {
            reject(new Error(result.error));
            return;
          }

          const stixObjects = result as StixObject[];
          
          // Cache the results
          this.stixCache.set(cacheKey, stixObjects);
          
          resolve(this.applyFilters(stixObjects, filters));
        } catch (parseError) {
          reject(new Error(`Failed to parse Python output: ${parseError}`));
        }
      });
    });
  }

  /**
   * Fallback JavaScript STIX object fetching
   */
  private async fetchStixObjectsJavaScript(
    server: TaxiiServer,
    collectionId: string,
    filters?: { type?: string; added_after?: string; limit?: number }
  ): Promise<StixObject[]> {
    try {
      const discovery = await this.getDiscovery(server.id);
      if (!discovery || !discovery.api_roots.length) {
        return [];
      }

      const apiRoot = discovery.api_roots[0];
      const headers = {
        'Accept': 'application/taxii+json;version=2.1'
      };

      const auth = server.username && server.password 
        ? { username: server.username, password: server.password }
        : undefined;

      const params: any = {};
      if (filters?.type) params.type = filters.type;
      if (filters?.added_after) params.added_after = filters.added_after;
      if (filters?.limit) params.limit = filters.limit;

      const response = await axios.get(
        `${server.url}${apiRoot}/collections/${collectionId}/objects/`,
        {
          headers,
          auth,
          params,
          timeout: 30000
        }
      );

      // Handle TAXII 2.1 envelope format
      const data = response.data;
      const objects = data.objects || data.results || [];

      return objects.map((obj: any) => ({
        ...obj,
        spec_version: obj.spec_version || '2.1'
      })) as StixObject[];

    } catch (error) {
      console.error('JavaScript STIX fetch failed:', error);
      return [];
    }
  }

  /**
   * Apply filters to STIX objects
   */
  private applyFilters(objects: StixObject[], filters?: { type?: string; added_after?: string; limit?: number }): StixObject[] {
    let filtered = [...objects];

    if (filters?.type) {
      const types = filters.type.split(',').map(t => t.trim());
      filtered = filtered.filter(obj => types.includes(obj.type));
    }

    if (filters?.added_after) {
      const afterDate = new Date(filters.added_after);
      filtered = filtered.filter(obj => new Date(obj.created) > afterDate);
    }

    if (filters?.limit) {
      filtered = filtered.slice(0, filters.limit);
    }

    return filtered;
  }

  /**
   * Get all configured TAXII servers
   */
  getAllServers(): TaxiiServer[] {
    return Array.from(this.servers.values());
  }

  /**
   * Get CISA compliant servers only
   */
  getCisaCompliantServers(): TaxiiServer[] {
    return Array.from(this.servers.values()).filter(server => server.cisaCompliant);
  }

  /**
   * Sync all active servers
   */
  async syncAllServers(): Promise<{ success: number; failed: number; details: string[] }> {
    const results = { success: 0, failed: 0, details: [] as string[] };
    
    for (const server of this.servers.values()) {
      if (server.status !== 'active') continue;
      
      try {
        // Test connection and update collections
        const isConnected = await this.testServerConnection(server.url, server.username, server.password);
        if (isConnected) {
          server.collections = await this.getCollections(server.url, server.username, server.password);
          server.lastSync = new Date();
          server.status = 'active';
          results.success++;
          results.details.push(`✅ ${server.name}: Synced ${server.collections?.length || 0} collections`);
        } else {
          server.status = 'error';
          results.failed++;
          results.details.push(`❌ ${server.name}: Connection failed`);
        }
      } catch (error) {
        server.status = 'error';
        results.failed++;
        results.details.push(`❌ ${server.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    console.log(`🔄 TAXII sync completed: ${results.success} success, ${results.failed} failed`);
    return results;
  }

  /**
   * Get STIX statistics for CISA compliance reporting
   */
  async getCisaComplianceStats(): Promise<{
    totalServers: number;
    activeServers: number;
    cisaCompliantServers: number;
    totalCollections: number;
    lastSyncTime?: Date;
    stixObjectTypes: { [type: string]: number };
  }> {
    const servers = this.getAllServers();
    const cisaServers = this.getCisaCompliantServers();
    const activeServers = servers.filter(s => s.status === 'active');
    
    const totalCollections = servers.reduce((sum, server) => 
      sum + (server.collections?.length || 0), 0
    );

    const lastSyncTime = servers.reduce((latest, server) => {
      if (!server.lastSync) return latest;
      return !latest || server.lastSync > latest ? server.lastSync : latest;
    }, undefined as Date | undefined);

    // Count STIX object types from cache
    const stixObjectTypes: { [type: string]: number } = {};
    for (const objects of this.stixCache.values()) {
      for (const obj of objects) {
        stixObjectTypes[obj.type] = (stixObjectTypes[obj.type] || 0) + 1;
      }
    }

    return {
      totalServers: servers.length,
      activeServers: activeServers.length,
      cisaCompliantServers: cisaServers.length,
      totalCollections,
      lastSyncTime,
      stixObjectTypes
    };
  }
}

export const taxiiStixService = new TaxiiStixService();