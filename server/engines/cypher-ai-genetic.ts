/**
 * Cypher AI Genetic Algorithm Engine
 * Phase 1: Critical Infrastructure for Self-Evolving Security Policies
 * 
 * Features:
 * - Genetic Algorithm Framework with DEAP integration
 * - Neural Architecture Search (NAS) capabilities
 * - Federated Genetic Learning
 * - FERPA/FISMA sector-specific adaptation
 */

import { spawn } from 'child_process';
import { EventEmitter } from 'events';
import path from 'path';
import { GeneticMemoryStore } from '../services/genetic-memory-store.js';
import type { DbProvider } from '../db.js';

export interface GeneticIndividual {
  id: string;
  genome: number[];
  fitness: number;
  generation: number;
  sector: 'FERPA' | 'FISMA' | 'CIPA' | 'GENERAL';
  policyRules: SecurityPolicyRule[];
  accuracy: number;
  createdAt: Date;
}

export interface SecurityPolicyRule {
  ruleId: string;
  condition: string;
  action: 'ALLOW' | 'DENY' | 'MONITOR' | 'QUARANTINE';
  priority: number;
  confidence: number;
  adaptationLevel: number;
}

export interface GeneticPopulation {
  individuals: GeneticIndividual[];
  generation: number;
  averageFitness: number;
  bestFitness: number;
  diversity: number;
  sector: string;
}

export interface FederatedLearningNode {
  nodeId: string;
  organization: string;
  sector: string;
  population: GeneticPopulation;
  learningRate: number;
  contribution: number;
}

export interface CypherAIGeneticEngineOptions {
  dbProvider?: DbProvider;
  geneticMemoryStore?: GeneticMemoryStore;
}

export class CypherAIGeneticEngine extends EventEmitter {
  private populations: Map<string, GeneticPopulation> = new Map();
  private federatedNodes: Map<string, FederatedLearningNode> = new Map();
  private isEvolutionActive: boolean = false;
  private currentGeneration: number = 0;
  private pythonProcess: any = null;
  private isStarted: boolean = false;
  private startPromise: Promise<void> | null = null;
  
  // Injected dependencies
  private geneticMemoryStore: GeneticMemoryStore;
  
  // Phase 2: Enhanced AI Components (lazy loaded)
  private nasEngine: any = null;
  private meetingIntelligence: any = null;
  private federatedLearning: any = null;
  
  // Genetic Algorithm Parameters
  private readonly POPULATION_SIZE = 100;
  private readonly MUTATION_RATE = 0.1;
  private readonly CROSSOVER_RATE = 0.8;
  private readonly ELITE_SIZE = 10;
  private readonly MAX_GENERATIONS = 1000;
  private readonly TARGET_ACCURACY = 99.2; // 99.2% target accuracy

  constructor(options: CypherAIGeneticEngineOptions = {}) {
    super();
    
    // Dependency injection with lazy fallbacks
    this.geneticMemoryStore = options.geneticMemoryStore || new GeneticMemoryStore({
      dbProvider: options.dbProvider
    });
    
    console.log('🧬 Cypher AI Genetic Engine constructed (lazy mode - call start() to initialize)');
  }

  /**
   * Start and initialize the Cypher AI Genetic Engine
   * This method is idempotent and safe to call multiple times
   */
  async start(): Promise<void> {
    if (this.startPromise) {
      return this.startPromise;
    }

    this.startPromise = this.performStart();
    return this.startPromise;
  }

  /**
   * Perform one-time initialization of the engine
   */
  private async performStart(): Promise<void> {
    if (this.isStarted) {
      return;
    }
    console.log('🧬 Starting Cypher AI Genetic Algorithm Engine...');
    
    try {
      // Lazy load Phase 2 components
      await this.loadServices();
      
      // Initialize sector-specific populations
      await this.initializeSectorPopulations();
      
      // Load previous generations from memory store
      await this.loadPreviousGenerations();
      
      // Start Python genetic algorithm backend
      await this.startPythonBackend();
      
      // Initialize federated learning network
      this.initializeFederatedLearning();
      
      this.isStarted = true;
      console.log('✅ Cypher AI Genetic Engine started successfully');
      this.emit('engineStarted');
      
    } catch (error) {
      console.error('❌ Failed to start Cypher AI Genetic Engine:', error);
      this.emit('engineError', error);
      throw error;
    }
  }

  /**
   * Lazy load services only when the engine starts
   */
  private async loadServices(): Promise<void> {
    console.log('📦 Loading AI services...');
    
    try {
      // Dynamic imports to avoid loading services during construction
      const [NeuralArchitectureSearchEngine, MeetingIntelligenceService, FederatedLearningEnhancement] = await Promise.all([
        import('./neural-architecture-search.js').then(m => m.default).catch(() => null),
        import('../services/meeting-intelligence.js').then(m => m.default).catch(() => null),
        import('../services/federated-learning-enhancement.js').then(m => m.default).catch(() => null)
      ]);
      
      // Initialize services if available
      if (NeuralArchitectureSearchEngine) {
        this.nasEngine = new NeuralArchitectureSearchEngine();
        console.log('✅ Neural Architecture Search Engine loaded');
      } else {
        console.log('⚠️ Neural Architecture Search Engine not available');
      }
      
      if (MeetingIntelligenceService) {
        this.meetingIntelligence = new MeetingIntelligenceService();
        console.log('✅ Meeting Intelligence Service loaded');
      } else {
        console.log('⚠️ Meeting Intelligence Service not available');
      }
      
      if (FederatedLearningEnhancement) {
        this.federatedLearning = new FederatedLearningEnhancement();
        console.log('✅ Federated Learning Enhancement loaded');
      } else {
        console.log('⚠️ Federated Learning Enhancement not available');
      }
      
    } catch (error) {
      console.error('❌ Failed to load some services:', error);
      // Continue without failing - services are optional
    }
  }

  /**
   * Ensure the engine is started before performing operations
   */
  private async ensureStarted(): Promise<void> {
    if (!this.isStarted && !this.startPromise) {
      throw new Error('Cypher AI Genetic Engine not started. Call start() first.');
    }
    
    if (this.startPromise) {
      await this.startPromise;
    }
  }

  /**
   * Initialize sector-specific populations for different compliance frameworks
   */
  private async initializeSectorPopulations(): Promise<void> {
    const sectors = ['FERPA', 'FISMA', 'CIPA', 'GENERAL'];
    
    for (const sector of sectors) {
      const population: GeneticPopulation = {
        individuals: await this.generateInitialPopulation(sector as any),
        generation: 0,
        averageFitness: 0,
        bestFitness: 0,
        diversity: 1.0,
        sector
      };
      
      this.populations.set(sector, population);
      console.log(`🧬 Initialized ${sector} population with ${this.POPULATION_SIZE} individuals`);
    }
  }

  /**
   * Generate initial population for a specific sector
   */
  private async generateInitialPopulation(sector: GeneticIndividual['sector']): Promise<GeneticIndividual[]> {
    const individuals: GeneticIndividual[] = [];
    
    for (let i = 0; i < this.POPULATION_SIZE; i++) {
      const individual: GeneticIndividual = {
        id: `${sector}-${i}-${Date.now()}`,
        genome: this.generateRandomGenome(),
        fitness: 0,
        generation: 0,
        sector,
        policyRules: this.generateInitialPolicyRules(sector),
        accuracy: Math.random() * 0.3 + 0.7, // Start with 70-100% accuracy
        createdAt: new Date()
      };
      
      individuals.push(individual);
    }
    
    return individuals;
  }

  /**
   * Generate random genome for genetic algorithm
   */
  private generateRandomGenome(): number[] {
    const genomeLength = 64; // 64-bit genome for policy encoding
    return Array.from({ length: genomeLength }, () => Math.random() > 0.5 ? 1 : 0);
  }

  /**
   * Generate initial security policy rules based on sector
   */
  private generateInitialPolicyRules(sector: GeneticIndividual['sector']): SecurityPolicyRule[] {
    const basePolicies: SecurityPolicyRule[] = [];
    
    // Sector-specific policy generation
    switch (sector) {
      case 'FERPA':
        basePolicies.push({
          ruleId: 'FERPA-001',
          condition: 'student_data_access && !authorized_educational_official',
          action: 'DENY',
          priority: 100,
          confidence: 0.95,
          adaptationLevel: 1
        });
        break;
        
      case 'FISMA':
        basePolicies.push({
          ruleId: 'FISMA-001',
          condition: 'government_data_access && security_level < required_clearance',
          action: 'DENY',
          priority: 100,
          confidence: 0.98,
          adaptationLevel: 1
        });
        break;
        
      case 'CIPA':
        basePolicies.push({
          ruleId: 'CIPA-001',
          condition: 'internet_access && minor_user && inappropriate_content',
          action: 'DENY',
          priority: 100,
          confidence: 0.90,
          adaptationLevel: 1
        });
        break;
        
      default:
        basePolicies.push({
          ruleId: 'GEN-001',
          condition: 'suspicious_activity && threat_level > threshold',
          action: 'MONITOR',
          priority: 50,
          confidence: 0.80,
          adaptationLevel: 1
        });
    }
    
    return basePolicies;
  }

  /**
   * Start Python backend for heavy genetic algorithm computations
   */
  private async startPythonBackend(): Promise<void> {
    return new Promise((resolve, reject) => {
      const pythonScriptPath = path.join(import.meta.dirname, '../../python/genetic_engine.py');
      
      this.pythonProcess = spawn('python3', [pythonScriptPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env }
      });

      this.pythonProcess.stdout?.on('data', (data: Buffer) => {
        const message = data.toString().trim();
        if (message.startsWith('READY')) {
          console.log('🐍 Python genetic engine backend ready');
          resolve();
        } else if (message.startsWith('FITNESS:')) {
          this.handleFitnessUpdate(message);
        } else if (message.startsWith('EVOLUTION:')) {
          this.handleEvolutionUpdate(message);
        }
      });

      this.pythonProcess.stderr?.on('data', (data: Buffer) => {
        console.error('Python backend error:', data.toString());
      });

      this.pythonProcess.on('error', (error: Error) => {
        console.error('Failed to start Python backend:', error);
        reject(error);
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        if (this.pythonProcess && !this.pythonProcess.killed) {
          console.log('⚠️ Python backend not ready, continuing with JS-only mode');
          resolve();
        }
      }, 10000);
    });
  }


  /**
   * Load previous generations from memory store
   */
  private async loadPreviousGenerations(): Promise<void> {
    console.log('📚 Loading previous generation history...');
    
    for (const sector of ['FERPA', 'FISMA', 'CIPA', 'GENERAL']) {
      try {
        const history = await this.geneticMemoryStore.getGenerationHistory(sector, 10);
        if (history.length > 0) {
          const latestGeneration = history[0];
          console.log(`📖 Found ${history.length} previous generations for ${sector} (latest: gen ${latestGeneration.generation})`);
          
          // Update current generation counter
          this.currentGeneration = Math.max(this.currentGeneration, latestGeneration.generation);
          
          // Load best individuals for seeding
          const bestIndividuals = await this.geneticMemoryStore.getBestIndividuals(sector, 5);
          if (bestIndividuals.length > 0) {
            const population = this.populations.get(sector);
            if (population) {
              // Replace some random individuals with proven winners
              for (let i = 0; i < Math.min(5, bestIndividuals.length); i++) {
                if (population.individuals[i]) {
                  population.individuals[i] = {
                    ...bestIndividuals[i],
                    generation: 0, // Reset for current evolution
                    createdAt: new Date()
                  };
                }
              }
              console.log(`🌟 Seeded ${sector} population with ${bestIndividuals.length} elite individuals`);
            }
          }
        }
      } catch (error) {
        console.error(`❌ Failed to load previous generations for ${sector}:`, error);
      }
    }
  }

  /**
   * Initialize federated learning network
   */
  private initializeFederatedLearning(): void {
    // Simulate federated learning nodes for demo
    const demoNodes = [
      { nodeId: 'edu-001', organization: 'State University', sector: 'FERPA' },
      { nodeId: 'gov-001', organization: 'Federal Agency', sector: 'FISMA' },
      { nodeId: 'sch-001', organization: 'Public School District', sector: 'CIPA' }
    ];

    for (const node of demoNodes) {
      const federatedNode: FederatedLearningNode = {
        ...node,
        population: this.populations.get(node.sector)!,
        learningRate: 0.01,
        contribution: Math.random() * 0.5 + 0.5
      };
      
      this.federatedNodes.set(node.nodeId, federatedNode);
    }
    
    console.log(`🌐 Initialized federated learning with ${demoNodes.length} nodes`);
  }

  /**
   * Start genetic algorithm evolution process
   */
  async startEvolution(): Promise<void> {
    await this.ensureStarted();
    
    if (this.isEvolutionActive) {
      console.log('⚠️ Evolution already in progress');
      return;
    }

    this.isEvolutionActive = true;
    console.log('🚀 Starting Cypher AI genetic evolution...');
    
    // Run evolution for each sector
    for (const [sector, population] of this.populations) {
      this.evolvePopulation(sector, population);
    }
    
    this.emit('evolutionStarted');
  }

  /**
   * Evolve a specific population
   */
  private async evolvePopulation(sector: string, population: GeneticPopulation): Promise<void> {
    while (this.isEvolutionActive && this.currentGeneration < this.MAX_GENERATIONS) {
      // Evaluate fitness
      await this.evaluatePopulationFitness(population);
      
      // Check if target accuracy reached
      if (population.bestFitness >= this.TARGET_ACCURACY) {
        console.log(`🎯 Target accuracy ${this.TARGET_ACCURACY}% reached for ${sector} in generation ${this.currentGeneration}`);
        break;
      }
      
      // Genetic operations: selection, crossover, mutation
      population.individuals = await this.performGeneticOperations(population.individuals);
      population.generation++;
      this.currentGeneration++;
      
      // Update population statistics
      this.updatePopulationStats(population);
      
      // Store generation in memory store for persistence
      try {
        await this.geneticMemoryStore.storeGeneration(population, {
          mutationRate: this.MUTATION_RATE,
          crossoverRate: this.CROSSOVER_RATE,
          eliteSize: this.ELITE_SIZE,
          targetAccuracy: this.TARGET_ACCURACY
        });
        console.log(`💾 Stored generation ${population.generation} for ${sector} in memory store`);
      } catch (error) {
        console.error(`❌ Failed to store generation ${population.generation}:`, error);
      }
      
      // Emit evolution progress
      this.emit('generationComplete', {
        sector,
        generation: population.generation,
        bestFitness: population.bestFitness,
        averageFitness: population.averageFitness
      });
      
      // Federated learning synchronization
      if (population.generation % 10 === 0) {
        await this.federatedLearningSync(sector);
      }
      
      // Cleanup old generations periodically
      if (population.generation % 100 === 0) {
        await this.geneticMemoryStore.cleanupOldGenerations(sector, 500);
      }
    }
  }

  /**
   * Evaluate fitness for all individuals in population
   */
  private async evaluatePopulationFitness(population: GeneticPopulation): Promise<void> {
    for (const individual of population.individuals) {
      individual.fitness = await this.calculateFitness(individual);
    }
  }

  /**
   * Calculate fitness score for an individual
   */
  private async calculateFitness(individual: GeneticIndividual): Promise<number> {
    // Check fitness cache first
    const startTime = Date.now();
    const cached = await this.geneticMemoryStore.getCachedFitness(individual.genome, individual.sector);
    if (cached) {
      console.log(`💾 Using cached fitness for ${individual.id}: ${cached.fitness.toFixed(2)}`);
      return cached.fitness;
    }
    
    // Fitness based on:
    // 1. Policy effectiveness (threat detection rate)
    // 2. False positive rate
    // 3. Compliance adherence
    // 4. Adaptation speed
    
    const threatDetectionRate = individual.accuracy;
    const falsePositiveRate = Math.random() * 0.1; // Simulate FP rate
    const complianceScore = this.calculateComplianceScore(individual);
    const adaptationScore = this.calculateAdaptationScore(individual);
    
    const fitness = (
      threatDetectionRate * 0.4 +
      (1 - falsePositiveRate) * 0.3 +
      complianceScore * 0.2 +
      adaptationScore * 0.1
    ) * 100;
    
    const finalFitness = Math.min(100, Math.max(0, fitness));
    const evaluationTime = Date.now() - startTime;
    
    // Cache the fitness evaluation
    await this.geneticMemoryStore.cacheFitnessEvaluation(
      individual.genome, 
      individual.sector, 
      finalFitness, 
      individual.accuracy, 
      evaluationTime
    );
    
    return finalFitness;
  }

  /**
   * Calculate compliance score based on sector requirements
   */
  private calculateComplianceScore(individual: GeneticIndividual): number {
    // Sector-specific compliance scoring
    let baseScore = 0.8;
    
    switch (individual.sector) {
      case 'FERPA':
        // Check for student privacy protection rules
        baseScore += individual.policyRules.filter(rule => 
          rule.condition.includes('student_data')).length * 0.05;
        break;
      case 'FISMA':
        // Check for government security controls
        baseScore += individual.policyRules.filter(rule => 
          rule.condition.includes('security_level')).length * 0.05;
        break;
      case 'CIPA':
        // Check for internet filtering rules
        baseScore += individual.policyRules.filter(rule => 
          rule.condition.includes('inappropriate_content')).length * 0.05;
        break;
    }
    
    return Math.min(1.0, baseScore);
  }

  /**
   * Calculate adaptation score
   */
  private calculateAdaptationScore(individual: GeneticIndividual): number {
    const avgAdaptationLevel = individual.policyRules.reduce((sum, rule) => 
      sum + rule.adaptationLevel, 0) / individual.policyRules.length;
    
    return Math.min(1.0, avgAdaptationLevel / 10);
  }

  /**
   * Perform genetic operations: selection, crossover, mutation
   */
  private async performGeneticOperations(individuals: GeneticIndividual[]): Promise<GeneticIndividual[]> {
    // Sort by fitness (descending)
    individuals.sort((a, b) => b.fitness - a.fitness);
    
    // Elite selection
    const elite = individuals.slice(0, this.ELITE_SIZE);
    const newPopulation = [...elite];
    
    // Generate offspring through crossover and mutation
    while (newPopulation.length < this.POPULATION_SIZE) {
      const parent1 = this.tournamentSelection(individuals);
      const parent2 = this.tournamentSelection(individuals);
      
      const offspring = await this.crossover(parent1, parent2);
      const mutatedOffspring = this.mutate(offspring);
      
      newPopulation.push(mutatedOffspring);
    }
    
    return newPopulation;
  }

  /**
   * Tournament selection for parent selection
   */
  private tournamentSelection(individuals: GeneticIndividual[]): GeneticIndividual {
    const tournamentSize = 5;
    const tournament = [];
    
    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = Math.floor(Math.random() * individuals.length);
      tournament.push(individuals[randomIndex]);
    }
    
    return tournament.reduce((best, current) => 
      current.fitness > best.fitness ? current : best);
  }

  /**
   * Genetic crossover operation
   */
  private async crossover(parent1: GeneticIndividual, parent2: GeneticIndividual): Promise<GeneticIndividual> {
    const crossoverPoint = Math.floor(Math.random() * parent1.genome.length);
    
    const offspring: GeneticIndividual = {
      id: `${parent1.sector}-${Date.now()}-${Math.random()}`,
      genome: [
        ...parent1.genome.slice(0, crossoverPoint),
        ...parent2.genome.slice(crossoverPoint)
      ],
      fitness: 0,
      generation: parent1.generation + 1,
      sector: parent1.sector,
      policyRules: this.combinePolicyRules(parent1.policyRules, parent2.policyRules),
      accuracy: (parent1.accuracy + parent2.accuracy) / 2,
      createdAt: new Date()
    };
    
    return offspring;
  }

  /**
   * Combine policy rules from two parents
   */
  private combinePolicyRules(rules1: SecurityPolicyRule[], rules2: SecurityPolicyRule[]): SecurityPolicyRule[] {
    const combined = [...rules1];
    
    for (const rule2 of rules2) {
      const existingRule = combined.find(r => r.ruleId === rule2.ruleId);
      if (!existingRule) {
        combined.push(rule2);
      } else {
        // Combine confidence scores
        existingRule.confidence = (existingRule.confidence + rule2.confidence) / 2;
        existingRule.adaptationLevel = Math.max(existingRule.adaptationLevel, rule2.adaptationLevel);
      }
    }
    
    return combined;
  }

  /**
   * Genetic mutation operation
   */
  private mutate(individual: GeneticIndividual): GeneticIndividual {
    const mutatedGenome = [...individual.genome];
    
    for (let i = 0; i < mutatedGenome.length; i++) {
      if (Math.random() < this.MUTATION_RATE) {
        mutatedGenome[i] = mutatedGenome[i] === 0 ? 1 : 0;
      }
    }
    
    // Policy rule mutation
    const mutatedRules = individual.policyRules.map(rule => {
      if (Math.random() < this.MUTATION_RATE) {
        return {
          ...rule,
          confidence: Math.min(1.0, rule.confidence + (Math.random() - 0.5) * 0.1),
          adaptationLevel: rule.adaptationLevel + 1
        };
      }
      return rule;
    });
    
    return {
      ...individual,
      genome: mutatedGenome,
      policyRules: mutatedRules,
      id: `${individual.sector}-${Date.now()}-${Math.random()}`
    };
  }

  /**
   * Update population statistics
   */
  private updatePopulationStats(population: GeneticPopulation): void {
    const fitnesses = population.individuals.map(ind => ind.fitness);
    
    population.averageFitness = fitnesses.reduce((sum, f) => sum + f, 0) / fitnesses.length;
    population.bestFitness = Math.max(...fitnesses);
    population.diversity = this.calculateDiversity(population.individuals);
  }

  /**
   * Calculate population diversity
   */
  private calculateDiversity(individuals: GeneticIndividual[]): number {
    // Calculate genetic diversity based on genome differences
    let totalDifference = 0;
    let comparisons = 0;
    
    for (let i = 0; i < individuals.length; i++) {
      for (let j = i + 1; j < individuals.length; j++) {
        const diff = individuals[i].genome.reduce((sum, gene, idx) => 
          sum + Math.abs(gene - individuals[j].genome[idx]), 0);
        totalDifference += diff;
        comparisons++;
      }
    }
    
    return comparisons > 0 ? totalDifference / comparisons / individuals[0].genome.length : 0;
  }

  /**
   * Federated learning synchronization
   */
  private async federatedLearningSync(sector: string): Promise<void> {
    console.log(`🌐 Performing federated learning sync for ${sector}`);
    
    // Simulate federated learning knowledge exchange
    const relevantNodes = Array.from(this.federatedNodes.values())
      .filter(node => node.sector === sector);
    
    if (relevantNodes.length === 0) return;
    
    // Average the best individuals across nodes
    const population = this.populations.get(sector)!;
    const bestIndividuals = population.individuals
      .sort((a, b) => b.fitness - a.fitness)
      .slice(0, 10);
    
    // Share knowledge with federated nodes
    for (const node of relevantNodes) {
      node.contribution = Math.min(1.0, node.contribution + 0.01);
      
      // Store federated node state in memory store
      await this.geneticMemoryStore.storeFederatedNode(node);
    }
    
    this.emit('federatedSync', { sector, nodesCount: relevantNodes.length });
  }

  /**
   * Handle fitness updates from Python backend
   */
  private handleFitnessUpdate(message: string): void {
    try {
      const data = JSON.parse(message.substring(8)); // Remove 'FITNESS:' prefix
      this.emit('fitnessUpdate', data);
    } catch (error) {
      console.error('Error parsing fitness update:', error);
    }
  }

  /**
   * Handle evolution updates from Python backend
   */
  private handleEvolutionUpdate(message: string): void {
    try {
      const data = JSON.parse(message.substring(10)); // Remove 'EVOLUTION:' prefix
      this.emit('evolutionUpdate', data);
    } catch (error) {
      console.error('Error parsing evolution update:', error);
    }
  }

  /**
   * Stop evolution process
   */
  async stopEvolution(): Promise<void> {
    await this.ensureStarted();
    
    if (!this.isEvolutionActive) {
      console.log('ℹ️ Evolution is not active');
      return;
    }
    
    this.isEvolutionActive = false;
    console.log('🛑 Stopping Cypher AI genetic evolution');
    this.emit('evolutionStopped');
  }

  /**
   * Get current population status
   */
  async getPopulationStatus(): Promise<Map<string, GeneticPopulation>> {
    await this.ensureStarted();
    return new Map(this.populations);
  }

  /**
   * Get federated learning network status
   */
  async getFederatedNetworkStatus(): Promise<Map<string, FederatedLearningNode>> {
    await this.ensureStarted();
    return new Map(this.federatedNodes);
  }

  /**
   * Get best performing individual for a sector
   */
  async getBestIndividual(sector: string): Promise<GeneticIndividual | null> {
    await this.ensureStarted();
    
    const population = this.populations.get(sector);
    if (!population || population.individuals.length === 0) return null;
    
    return population.individuals.reduce((best, current) => 
      current.fitness > best.fitness ? current : best);
  }

  /**
   * Deploy evolved policy to production
   */
  async deployPolicy(sector: string): Promise<boolean> {
    await this.ensureStarted();
    
    const bestIndividual = await this.getBestIndividual(sector);
    if (!bestIndividual) {
      console.error(`No best individual found for sector ${sector}`);
      return false;
    }
    
    console.log(`🚀 Deploying evolved ${sector} policy (Fitness: ${bestIndividual.fitness.toFixed(2)}%)`);
    
    // Here we would integrate with the actual security policy enforcement system
    this.emit('policyDeployed', {
      sector,
      individual: bestIndividual,
      deployedAt: new Date()
    });
    
    return true;
  }

  /**
   * Stop the engine and cleanup resources
   */
  async stop(): Promise<void> {
    if (!this.isStarted) {
      console.log('ℹ️ Engine is not started');
      return;
    }
    
    console.log('🛑 Stopping Cypher AI Genetic Engine...');
    
    // Stop evolution if active
    if (this.isEvolutionActive) {
      this.isEvolutionActive = false;
      this.emit('evolutionStopped');
    }
    
    // Close Python process if running
    if (this.pythonProcess && !this.pythonProcess.killed) {
      this.pythonProcess.kill();
      this.pythonProcess = null;
      console.log('🐍 Python backend process terminated');
    }
    
    // Clear internal state
    this.populations.clear();
    this.federatedNodes.clear();
    this.currentGeneration = 0;
    
    this.isStarted = false;
    this.startPromise = null;
    
    console.log('✅ Cypher AI Genetic Engine stopped');
    this.emit('engineStopped');
  }

  /**
   * Check if the engine is ready for operations
   */
  isReady(): boolean {
    return this.isStarted;
  }

  /**
   * Get current evolution status
   */
  async getEvolutionStatus(): Promise<{
    isActive: boolean;
    currentGeneration: number;
    sectors: string[];
    populationStats: { [sector: string]: { bestFitness: number; averageFitness: number; } };
  }> {
    await this.ensureStarted();
    
    const populationStats: { [sector: string]: { bestFitness: number; averageFitness: number; } } = {};
    
    for (const [sector, population] of this.populations) {
      populationStats[sector] = {
        bestFitness: population.bestFitness,
        averageFitness: population.averageFitness
      };
    }
    
    return {
      isActive: this.isEvolutionActive,
      currentGeneration: this.currentGeneration,
      sectors: Array.from(this.populations.keys()),
      populationStats
    };
  }

  /**
   * Alias for backward compatibility
   * @deprecated Use stop() instead
   */
  async shutdown(): Promise<void> {
    console.warn('shutdown() is deprecated. Use stop() instead.');
    await this.stop();
  }
}

// Factory function for creating engine with proper dependency injection
export function createCypherAIGeneticEngine(options: CypherAIGeneticEngineOptions = {}): CypherAIGeneticEngine {
  return new CypherAIGeneticEngine(options);
}

// Singleton instance (lazy)
let _engineInstance: CypherAIGeneticEngine | null = null;

/**
 * Get or create the singleton Cypher AI Genetic Engine instance
 * This is a lazy factory that creates the engine only when first requested
 */
export function getCypherAIGeneticEngine(options: CypherAIGeneticEngineOptions = {}): CypherAIGeneticEngine {
  if (!_engineInstance) {
    _engineInstance = new CypherAIGeneticEngine(options);
  }
  return _engineInstance;
}

/**
 * Reset the singleton instance (useful for testing)
 */
export function resetCypherAIGeneticEngine(): void {
  if (_engineInstance) {
    _engineInstance.stop().catch(console.error);
    _engineInstance = null;
  }
}

export default CypherAIGeneticEngine;