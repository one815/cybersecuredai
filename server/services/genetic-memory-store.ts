/**
 * Genetic Multi-Generational Memory Store
 * Provides persistent storage and caching for Cypher AI genetic algorithm data
 * 
 * Features:
 * - Multi-generational history tracking
 * - High-performance caching for active populations
 * - Federated learning state synchronization
 * - Evolutionary analytics and metrics
 * - Fitness evaluation caching
 */

import { db } from '../db';
import { sql, eq, desc, and, gte } from 'drizzle-orm';
import type { 
  GeneticIndividual, 
  GeneticPopulation, 
  FederatedLearningNode,
  SecurityPolicyRule 
} from '../engines/cypher-ai-genetic';

// Database schema for genetic algorithm storage
export const geneticGenerations = {
  id: 'text',
  generation: 'integer',
  sector: 'text',
  bestFitness: 'real',
  averageFitness: 'real',
  diversity: 'real',
  populationSize: 'integer',
  evolutionParams: 'text', // JSON string
  createdAt: 'timestamp',
  metadata: 'text' // JSON string for additional data
};

export const geneticIndividuals = {
  id: 'text',
  generationId: 'text',
  genome: 'text', // JSON array
  fitness: 'real',
  accuracy: 'real',
  sector: 'text',
  policyRules: 'text', // JSON array
  parentIds: 'text', // JSON array for lineage tracking
  createdAt: 'timestamp'
};

export const federatedNodes = {
  nodeId: 'text',
  organization: 'text',
  sector: 'text',
  learningRate: 'real',
  contribution: 'real',
  lastSync: 'timestamp',
  status: 'text',
  metadata: 'text' // JSON string
};

export const fitnessCache = {
  genomeHash: 'text',
  sector: 'text',
  fitness: 'real',
  accuracy: 'real',
  evaluationTime: 'real',
  evaluatedAt: 'timestamp',
  cacheHits: 'integer'
};

export interface GenerationRecord {
  id: string;
  generation: number;
  sector: string;
  bestFitness: number;
  averageFitness: number;
  diversity: number;
  populationSize: number;
  evolutionParams: any;
  createdAt: Date;
  metadata: any;
}

export interface IndividualRecord {
  id: string;
  generationId: string;
  genome: number[];
  fitness: number;
  accuracy: number;
  sector: string;
  policyRules: SecurityPolicyRule[];
  parentIds: string[];
  createdAt: Date;
}

export interface FitnessEntry {
  genomeHash: string;
  sector: string;
  fitness: number;
  accuracy: number;
  evaluationTime: number;
  evaluatedAt: Date;
  cacheHits: number;
}

export class GeneticMemoryStore {
  private memoryCache: Map<string, any> = new Map();
  private fitnessCache: Map<string, FitnessEntry> = new Map();
  private readonly CACHE_TTL = 3600000; // 1 hour in milliseconds
  private readonly MAX_CACHE_SIZE = 10000;

  constructor() {
    this.initializeDatabase();
    this.startCacheCleanup();
  }

  /**
   * Initialize database tables for genetic algorithm storage
   */
  private async initializeDatabase(): Promise<void> {
    try {
      // Create tables if they don't exist
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS genetic_generations (
          id TEXT PRIMARY KEY,
          generation INTEGER NOT NULL,
          sector TEXT NOT NULL,
          best_fitness REAL NOT NULL,
          average_fitness REAL NOT NULL,
          diversity REAL NOT NULL,
          population_size INTEGER NOT NULL,
          evolution_params TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          metadata TEXT,
          UNIQUE(generation, sector)
        )
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS genetic_individuals (
          id TEXT PRIMARY KEY,
          generation_id TEXT NOT NULL,
          genome TEXT NOT NULL,
          fitness REAL NOT NULL,
          accuracy REAL NOT NULL,
          sector TEXT NOT NULL,
          policy_rules TEXT NOT NULL,
          parent_ids TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (generation_id) REFERENCES genetic_generations(id)
        )
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS federated_nodes (
          node_id TEXT PRIMARY KEY,
          organization TEXT NOT NULL,
          sector TEXT NOT NULL,
          learning_rate REAL NOT NULL,
          contribution REAL NOT NULL,
          last_sync TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'active',
          metadata TEXT
        )
      `);

      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS fitness_cache (
          genome_hash TEXT PRIMARY KEY,
          sector TEXT NOT NULL,
          fitness REAL NOT NULL,
          accuracy REAL NOT NULL,
          evaluation_time REAL NOT NULL,
          evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          cache_hits INTEGER DEFAULT 1
        )
      `);

      // Create indexes for performance
      await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_generations_sector ON genetic_generations(sector, generation)`);
      await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_individuals_generation ON genetic_individuals(generation_id)`);
      await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_fitness_sector ON fitness_cache(sector, genome_hash)`);

      console.log('✅ Genetic memory store database initialized');
    } catch (error) {
      console.error('❌ Failed to initialize genetic memory store database:', error);
    }
  }

  /**
   * Store a complete generation with all individuals
   */
  async storeGeneration(population: GeneticPopulation, evolutionParams: any = {}): Promise<string> {
    const generationId = `gen-${population.sector}-${population.generation}-${Date.now()}`;
    
    try {
      // Store generation record
      await db.execute(sql`
        INSERT INTO genetic_generations (
          id, generation, sector, best_fitness, average_fitness, 
          diversity, population_size, evolution_params, metadata
        ) VALUES (
          ${generationId}, ${population.generation}, ${population.sector},
          ${population.bestFitness}, ${population.averageFitness},
          ${population.diversity}, ${population.individuals.length},
          ${JSON.stringify(evolutionParams)}, ${JSON.stringify({ timestamp: new Date() })}
        )
      `);

      // Store all individuals in this generation
      for (const individual of population.individuals) {
        await this.storeIndividual(individual, generationId);
      }

      // Cache the generation for fast access
      this.cacheSet(`generation:${population.sector}:${population.generation}`, {
        ...population,
        generationId
      });

      console.log(`💾 Stored generation ${population.generation} for ${population.sector} (${population.individuals.length} individuals)`);
      return generationId;

    } catch (error) {
      console.error('❌ Failed to store generation:', error);
      throw error;
    }
  }

  /**
   * Store an individual genetic entity
   */
  async storeIndividual(individual: GeneticIndividual, generationId: string): Promise<void> {
    try {
      await db.execute(sql`
        INSERT INTO genetic_individuals (
          id, generation_id, genome, fitness, accuracy, sector, policy_rules, parent_ids
        ) VALUES (
          ${individual.id}, ${generationId}, ${JSON.stringify(individual.genome)},
          ${individual.fitness}, ${individual.accuracy}, ${individual.sector},
          ${JSON.stringify(individual.policyRules)}, ${JSON.stringify([])}
        )
      `);

      // Cache high-fitness individuals
      if (individual.fitness > 95.0) {
        this.cacheSet(`elite:${individual.sector}:${individual.id}`, individual);
      }

    } catch (error) {
      console.error('❌ Failed to store individual:', error);
      throw error;
    }
  }

  /**
   * Retrieve generational history for a sector
   */
  async getGenerationHistory(sector: string, limit: number = 50): Promise<GenerationRecord[]> {
    try {
      // Check cache first
      const cacheKey = `history:${sector}:${limit}`;
      const cached = this.cacheGet(cacheKey);
      if (cached) return cached;

      const results = await db.execute(sql`
        SELECT * FROM genetic_generations 
        WHERE sector = ${sector}
        ORDER BY generation DESC 
        LIMIT ${limit}
      `);

      const generations = (results.rows || results).map((row: any) => ({
        id: row.id as string,
        generation: row.generation as number,
        sector: row.sector as string,
        bestFitness: row.best_fitness as number,
        averageFitness: row.average_fitness as number,
        diversity: row.diversity as number,
        populationSize: row.population_size as number,
        evolutionParams: JSON.parse(row.evolution_params as string),
        createdAt: new Date(row.created_at as string),
        metadata: row.metadata ? JSON.parse(row.metadata as string) : {}
      }));

      // Cache the results
      this.cacheSet(cacheKey, generations);
      return generations;

    } catch (error) {
      console.error('❌ Failed to retrieve generation history:', error);
      return [];
    }
  }

  /**
   * Get best individuals across all generations for a sector
   */
  async getBestIndividuals(sector: string, limit: number = 10): Promise<IndividualRecord[]> {
    try {
      const cacheKey = `best:${sector}:${limit}`;
      const cached = this.cacheGet(cacheKey);
      if (cached) return cached;

      const results = await db.execute(sql`
        SELECT i.*, g.generation 
        FROM genetic_individuals i
        JOIN genetic_generations g ON i.generation_id = g.id
        WHERE i.sector = ${sector}
        ORDER BY i.fitness DESC 
        LIMIT ${limit}
      `);

      const individuals = (results as any[]).map(row => ({
        id: row.id as string,
        generationId: row.generation_id as string,
        genome: JSON.parse(row.genome as string),
        fitness: row.fitness as number,
        accuracy: row.accuracy as number,
        sector: row.sector as string,
        policyRules: JSON.parse(row.policy_rules as string),
        parentIds: row.parent_ids ? JSON.parse(row.parent_ids as string) : [],
        createdAt: new Date(row.created_at as string)
      }));

      this.cacheSet(cacheKey, individuals);
      return individuals;

    } catch (error) {
      console.error('❌ Failed to retrieve best individuals:', error);
      return [];
    }
  }

  /**
   * Cache fitness evaluation to avoid recomputation
   */
  async cacheFitnessEvaluation(genome: number[], sector: string, fitness: number, accuracy: number, evaluationTime: number): Promise<void> {
    const genomeHash = this.hashGenome(genome);
    const entry: FitnessEntry = {
      genomeHash,
      sector,
      fitness,
      accuracy,
      evaluationTime,
      evaluatedAt: new Date(),
      cacheHits: 1
    };

    try {
      // Store in database
      await db.execute(sql`
        INSERT INTO fitness_cache (
          genome_hash, sector, fitness, accuracy, evaluation_time
        ) VALUES (
          ${genomeHash}, ${sector}, ${fitness}, ${accuracy}, ${evaluationTime}
        ) ON CONFLICT(genome_hash) DO UPDATE SET
          cache_hits = cache_hits + 1,
          evaluated_at = CURRENT_TIMESTAMP
      `);

      // Store in memory cache
      this.fitnessCache.set(`${genomeHash}:${sector}`, entry);

    } catch (error) {
      console.error('❌ Failed to cache fitness evaluation:', error);
    }
  }

  /**
   * Retrieve cached fitness evaluation
   */
  async getCachedFitness(genome: number[], sector: string): Promise<FitnessEntry | null> {
    const genomeHash = this.hashGenome(genome);
    const cacheKey = `${genomeHash}:${sector}`;

    // Check memory cache first
    if (this.fitnessCache.has(cacheKey)) {
      return this.fitnessCache.get(cacheKey)!;
    }

    try {
      // Check database
      const results = await db.execute(sql`
        SELECT * FROM fitness_cache 
        WHERE genome_hash = ${genomeHash} AND sector = ${sector}
      `);

      if ((results as any[]).length > 0) {
        const row = (results as any[])[0];
        const entry: FitnessEntry = {
          genomeHash: row.genome_hash as string,
          sector: row.sector as string,
          fitness: row.fitness as number,
          accuracy: row.accuracy as number,
          evaluationTime: row.evaluation_time as number,
          evaluatedAt: new Date(row.evaluated_at as string),
          cacheHits: row.cache_hits as number
        };

        // Cache in memory for faster access
        this.fitnessCache.set(cacheKey, entry);
        return entry;
      }

      return null;

    } catch (error) {
      console.error('❌ Failed to retrieve cached fitness:', error);
      return null;
    }
  }

  /**
   * Store federated learning node state
   */
  async storeFederatedNode(node: FederatedLearningNode): Promise<void> {
    try {
      await db.execute(sql`
        INSERT INTO federated_nodes (
          node_id, organization, sector, learning_rate, contribution, metadata
        ) VALUES (
          ${node.nodeId}, ${node.organization}, ${node.sector},
          ${node.learningRate}, ${node.contribution}, ${JSON.stringify({})}
        ) ON CONFLICT(node_id) DO UPDATE SET
          learning_rate = ${node.learningRate},
          contribution = ${node.contribution},
          last_sync = CURRENT_TIMESTAMP
      `);

      console.log(`🌐 Stored federated node ${node.nodeId} (${node.organization})`);

    } catch (error) {
      console.error('❌ Failed to store federated node:', error);
    }
  }

  /**
   * Get evolutionary analytics for a sector
   */
  async getEvolutionaryAnalytics(sector: string, generations: number = 100): Promise<any> {
    try {
      const cacheKey = `analytics:${sector}:${generations}`;
      const cached = this.cacheGet(cacheKey);
      if (cached) return cached;

      // Get generation trends
      const trends = await db.execute(sql`
        SELECT 
          generation,
          best_fitness,
          average_fitness,
          diversity,
          population_size,
          created_at
        FROM genetic_generations 
        WHERE sector = ${sector}
        ORDER BY generation DESC 
        LIMIT ${generations}
      `);

      // Calculate statistics
      const fitnessValues = trends.map(t => t.best_fitness as number);
      const avgFitnessValues = trends.map(t => t.average_fitness as number);
      
      const analytics = {
        sector,
        totalGenerations: trends.length,
        currentBestFitness: fitnessValues[0] || 0,
        averageFitnessImprovement: this.calculateTrend(avgFitnessValues),
        fitnessVariance: this.calculateVariance(fitnessValues),
        convergenceRate: this.calculateConvergenceRate(fitnessValues),
        diversityTrend: this.calculateTrend(trends.map(t => t.diversity as number)),
        generationTrends: trends.reverse(), // Chronological order
        lastUpdated: new Date()
      };

      this.cacheSet(cacheKey, analytics, 300000); // Cache for 5 minutes
      return analytics;

    } catch (error) {
      console.error('❌ Failed to generate evolutionary analytics:', error);
      return null;
    }
  }

  /**
   * Clear old generations to manage storage
   */
  async cleanupOldGenerations(sector: string, keepGenerations: number = 1000): Promise<void> {
    try {
      const oldGenerations = await db.execute(sql`
        SELECT id FROM genetic_generations 
        WHERE sector = ${sector}
        ORDER BY generation DESC 
        OFFSET ${keepGenerations}
      `);

      if (oldGenerations.length > 0) {
        const idsToDelete = oldGenerations.map(g => g.id);
        
        // Delete individuals first (foreign key constraint)
        await db.execute(sql`
          DELETE FROM genetic_individuals 
          WHERE generation_id IN (${idsToDelete.join(',')})
        `);

        // Delete generations
        await db.execute(sql`
          DELETE FROM genetic_generations 
          WHERE id IN (${idsToDelete.join(',')})
        `);

        console.log(`🧹 Cleaned up ${oldGenerations.length} old generations for ${sector}`);
      }

    } catch (error) {
      console.error('❌ Failed to cleanup old generations:', error);
    }
  }

  /**
   * In-memory cache operations
   */
  private cacheSet(key: string, value: any, ttl: number = this.CACHE_TTL): void {
    if (this.memoryCache.size >= this.MAX_CACHE_SIZE) {
      // Remove oldest entries
      const entries = Array.from(this.memoryCache.entries());
      entries.slice(0, Math.floor(this.MAX_CACHE_SIZE * 0.2)).forEach(([k]) => {
        this.memoryCache.delete(k);
      });
    }

    this.memoryCache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  private cacheGet(key: string): any | null {
    const entry = this.memoryCache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.memoryCache.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Utility functions
   */
  private hashGenome(genome: number[]): string {
    return genome.join('').split('').reduce((hash, char) => {
      return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0).toString(36);
  }

  private calculateTrend(values: number[]): number {
    if (values.length < 2) return 0;
    
    const firstHalf = values.slice(0, Math.floor(values.length / 2));
    const secondHalf = values.slice(Math.floor(values.length / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    return secondAvg - firstAvg;
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    
    return variance;
  }

  private calculateConvergenceRate(values: number[]): number {
    if (values.length < 10) return 0;
    
    const recentValues = values.slice(-10);
    const variance = this.calculateVariance(recentValues);
    
    // Lower variance indicates higher convergence
    return Math.max(0, 1 - (variance / 100));
  }

  /**
   * Periodic cache cleanup
   */
  private startCacheCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      
      // Clean memory cache
      for (const [key, entry] of this.memoryCache.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          this.memoryCache.delete(key);
        }
      }

      // Clean fitness cache
      if (this.fitnessCache.size > this.MAX_CACHE_SIZE) {
        const entries = Array.from(this.fitnessCache.entries());
        entries.slice(0, Math.floor(entries.length * 0.2)).forEach(([k]) => {
          this.fitnessCache.delete(k);
        });
      }

    }, 300000); // Run every 5 minutes
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): any {
    return {
      memoryCacheSize: this.memoryCache.size,
      fitnessCacheSize: this.fitnessCache.size,
      totalCacheEntries: this.memoryCache.size + this.fitnessCache.size,
      maxCacheSize: this.MAX_CACHE_SIZE,
      cacheUtilization: ((this.memoryCache.size + this.fitnessCache.size) / (this.MAX_CACHE_SIZE * 2)) * 100
    };
  }
}

export const geneticMemoryStore = new GeneticMemoryStore();