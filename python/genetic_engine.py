#!/usr/bin/env python3
"""
Cypher AI Genetic Algorithm Engine - Python Backend
Phase 1: Critical Infrastructure with DEAP + PyTorch Integration

Features:
- DEAP genetic algorithm framework
- PyTorch neural network evolution
- Neural Architecture Search (NAS)
- Multi-objective optimization for security policies
"""

import sys
import json
import time
import random
import numpy as np
from typing import List, Dict, Tuple, Any
from datetime import datetime

import torch
import torch.nn as nn
import torch.optim as optim
from deap import base, creator, tools, algorithms

class SecurityPolicyNetwork(nn.Module):
    """PyTorch neural network for security policy evaluation"""
    
    def __init__(self, input_size=64, hidden_sizes=[128, 64, 32], output_size=1):
        super(SecurityPolicyNetwork, self).__init__()
        self.layers = nn.ModuleList()
        
        # Input layer
        prev_size = input_size
        for hidden_size in hidden_sizes:
            self.layers.append(nn.Linear(prev_size, hidden_size))
            self.layers.append(nn.ReLU())
            self.layers.append(nn.Dropout(0.2))
            prev_size = hidden_size
        
        # Output layer
        self.layers.append(nn.Linear(prev_size, output_size))
        self.layers.append(nn.Sigmoid())
    
    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return x

class CypherAIGeneticEngine:
    """Main genetic algorithm engine using DEAP framework"""
    
    def __init__(self):
        self.population_size = 100
        self.generation = 0
        self.max_generations = 1000
        self.target_fitness = 99.2
        
        # Initialize DEAP framework
        self.setup_deap()
        
        # Initialize PyTorch models for different sectors
        self.sector_models = {}
        self.setup_neural_networks()
        
        # Evolution statistics
        self.evolution_stats = {
            'best_fitness': [],
            'avg_fitness': [],
            'diversity': []
        }
        
        print("READY: Cypher AI Genetic Engine initialized")
        sys.stdout.flush()
    
    def setup_deap(self):
        """Setup DEAP genetic algorithm framework"""
        
        # Define fitness function (maximize accuracy, minimize false positives)
        creator.create("FitnessMulti", base.Fitness, weights=(1.0, -1.0))
        creator.create("Individual", list, fitness=creator.FitnessMulti)
        
        self.toolbox = base.Toolbox()
        
        # Genetic operators
        self.toolbox.register("attr_bool", random.randint, 0, 1)
        self.toolbox.register("individual", tools.initRepeat, 
                             creator.Individual, self.toolbox.attr_bool, 64)
        self.toolbox.register("population", tools.initRepeat, 
                             list, self.toolbox.individual)
        
        # Evolution operators
        self.toolbox.register("evaluate", self.evaluate_individual)
        self.toolbox.register("mate", tools.cxTwoPoint)
        self.toolbox.register("mutate", tools.mutFlipBit, indpb=0.1)
        self.toolbox.register("select", tools.selTournament, tournsize=3)
        
        print("✅ DEAP framework configured")
    
    def setup_neural_networks(self):
        """Setup PyTorch neural networks for each sector"""
        
        sectors = ['FERPA', 'FISMA', 'CIPA', 'GENERAL']
        
        for sector in sectors:
            model = SecurityPolicyNetwork()
            optimizer = optim.Adam(model.parameters(), lr=0.001)
            criterion = nn.BCELoss()
            
            self.sector_models[sector] = {
                'model': model,
                'optimizer': optimizer,
                'criterion': criterion,
                'training_data': self.generate_training_data(sector),
                'accuracy': 0.0
            }
        
        print("✅ PyTorch neural networks initialized for all sectors")
    
    def generate_training_data(self, sector: str) -> Dict[str, torch.Tensor]:
        """Generate synthetic training data for sector-specific policies"""
        
        # Generate synthetic security event data
        num_samples = 1000
        input_features = torch.randn(num_samples, 64)
        
        # Sector-specific label generation
        if sector == 'FERPA':
            # Education data protection scenarios
            labels = torch.where(
                (input_features[:, 0] > 0.5) & (input_features[:, 1] > 0.3),
                torch.ones(num_samples),
                torch.zeros(num_samples)
            )
        elif sector == 'FISMA':
            # Government security scenarios
            labels = torch.where(
                input_features[:, 0:10].sum(dim=1) > 2.0,
                torch.ones(num_samples),
                torch.zeros(num_samples)
            )
        elif sector == 'CIPA':
            # Internet filtering scenarios
            labels = torch.where(
                (input_features[:, 2] > 0.0) & (input_features[:, 3] < -0.5),
                torch.ones(num_samples),
                torch.zeros(num_samples)
            )
        else:
            # General security scenarios
            labels = torch.where(
                input_features.mean(dim=1) > 0.1,
                torch.ones(num_samples),
                torch.zeros(num_samples)
            )
        
        return {
            'inputs': input_features,
            'labels': labels.float()
        }
    
    def evaluate_individual(self, individual: List[int]) -> Tuple[float, float]:
        """Evaluate an individual's fitness using neural network prediction"""
        
        # Convert individual to PyTorch tensor
        genome_tensor = torch.tensor(individual, dtype=torch.float32).unsqueeze(0)
        
        # Evaluate across all sector models
        sector_scores = []
        false_positives = []
        
        for sector, model_data in self.sector_models.items():
            model = model_data['model']
            model.eval()
            
            with torch.no_grad():
                prediction = model(genome_tensor)
                
                # Simulate threat detection accuracy
                accuracy = float(prediction.item())
                
                # Calculate false positive rate based on genome characteristics
                fp_rate = self.calculate_false_positive_rate(individual, sector)
                
                sector_scores.append(accuracy)
                false_positives.append(fp_rate)
        
        # Overall fitness: average accuracy across sectors
        overall_accuracy = np.mean(sector_scores) * 100
        overall_fp_rate = np.mean(false_positives)
        
        return (overall_accuracy, overall_fp_rate)
    
    def calculate_false_positive_rate(self, individual: List[int], sector: str) -> float:
        """Calculate false positive rate based on individual's genome and sector"""
        
        # Count number of 1s in genome (policy strictness)
        strictness = sum(individual) / len(individual)
        
        # Sector-specific false positive calculation
        sector_multipliers = {
            'FERPA': 0.8,   # Education needs balance
            'FISMA': 0.6,   # Government can be stricter
            'CIPA': 0.9,    # Schools need careful filtering
            'GENERAL': 0.7  # General purpose
        }
        
        base_fp_rate = strictness * 0.15  # Base false positive rate
        sector_fp_rate = base_fp_rate * sector_multipliers.get(sector, 0.7)
        
        return min(0.3, sector_fp_rate)  # Cap at 30%
    
    def train_neural_networks(self, generation: int):
        """Train neural networks periodically during evolution"""
        
        if generation % 10 != 0:
            return
        
        print(f"🧠 Training neural networks at generation {generation}")
        
        for sector, model_data in self.sector_models.items():
            model = model_data['model']
            optimizer = model_data['optimizer']
            criterion = model_data['criterion']
            training_data = model_data['training_data']
            
            model.train()
            
            # Training loop
            for epoch in range(10):
                optimizer.zero_grad()
                
                outputs = model(training_data['inputs'])
                loss = criterion(outputs.squeeze(), training_data['labels'])
                
                loss.backward()
                optimizer.step()
            
            # Evaluate model accuracy
            model.eval()
            with torch.no_grad():
                predictions = model(training_data['inputs'])
                predicted_labels = (predictions.squeeze() > 0.5).float()
                accuracy = (predicted_labels == training_data['labels']).float().mean()
                model_data['accuracy'] = float(accuracy)
        
        print(f"✅ Neural network training completed")
    
    def run_evolution(self, sector: str = 'GENERAL'):
        """Run genetic algorithm evolution for a specific sector"""
        
        print(f"🚀 Starting evolution for sector: {sector}")
        
        # Create initial population
        population = self.toolbox.population(n=self.population_size)
        
        # Evolution statistics
        stats = tools.Statistics(lambda ind: ind.fitness.values)
        stats.register("avg", np.mean, axis=0)
        stats.register("std", np.std, axis=0)
        stats.register("min", np.min, axis=0)
        stats.register("max", np.max, axis=0)
        
        # Hall of fame for best individuals
        hof = tools.HallOfFame(10)
        
        # Run evolution
        for generation in range(self.max_generations):
            self.generation = generation
            
            # Evaluate population
            fitnesses = list(map(self.toolbox.evaluate, population))
            for ind, fit in zip(population, fitnesses):
                ind.fitness.values = fit
            
            # Update hall of fame
            hof.update(population)
            
            # Record statistics
            record = stats.compile(population)
            self.evolution_stats['best_fitness'].append(record['max'][0])
            self.evolution_stats['avg_fitness'].append(record['avg'][0])
            
            # Calculate population diversity
            diversity = self.calculate_diversity(population)
            self.evolution_stats['diversity'].append(diversity)
            
            # Send progress update
            progress_data = {
                'sector': sector,
                'generation': generation,
                'best_fitness': record['max'][0],
                'avg_fitness': record['avg'][0],
                'diversity': diversity,
                'population_size': len(population)
            }
            
            print(f"EVOLUTION:{json.dumps(progress_data)}")
            sys.stdout.flush()
            
            # Check if target fitness reached
            if record['max'][0] >= self.target_fitness:
                print(f"🎯 Target fitness {self.target_fitness}% reached in generation {generation}")
                break
            
            # Selection and reproduction
            offspring = self.toolbox.select(population, len(population))
            offspring = list(map(self.toolbox.clone, offspring))
            
            # Crossover
            for child1, child2 in zip(offspring[::2], offspring[1::2]):
                if random.random() < 0.8:  # Crossover probability
                    self.toolbox.mate(child1, child2)
                    del child1.fitness.values
                    del child2.fitness.values
            
            # Mutation
            for mutant in offspring:
                if random.random() < 0.1:  # Mutation probability
                    self.toolbox.mutate(mutant)
                    del mutant.fitness.values
            
            # Replace population
            population[:] = offspring
            
            # Train neural networks periodically
            self.train_neural_networks(generation)
            
            # Adaptive parameter adjustment
            self.adaptive_parameter_adjustment(generation, record)
        
        # Final results
        best_individual = hof[0]
        final_fitness = self.toolbox.evaluate(best_individual)
        
        print(f"🏆 Evolution completed for {sector}")
        print(f"   Best fitness: {final_fitness[0]:.2f}%")
        print(f"   False positive rate: {final_fitness[1]:.3f}")
        
        return {
            'best_individual': best_individual,
            'fitness': final_fitness,
            'generation': generation,
            'hall_of_fame': list(hof)
        }
    
    def calculate_diversity(self, population) -> float:
        """Calculate genetic diversity of the population"""
        
        if len(population) < 2:
            return 0.0
        
        total_distance = 0
        comparisons = 0
        
        for i in range(len(population)):
            for j in range(i + 1, len(population)):
                # Hamming distance between genomes
                distance = sum(a != b for a, b in zip(population[i], population[j]))
                total_distance += distance
                comparisons += 1
        
        return (total_distance / comparisons) / len(population[0]) if comparisons > 0 else 0.0
    
    def adaptive_parameter_adjustment(self, generation: int, stats: Dict):
        """Adaptively adjust genetic algorithm parameters based on evolution progress"""
        
        # Adjust mutation rate based on diversity
        current_diversity = self.evolution_stats['diversity'][-1]
        
        if current_diversity < 0.1:  # Low diversity, increase mutation
            self.toolbox.unregister("mutate")
            self.toolbox.register("mutate", tools.mutFlipBit, indpb=0.15)
        elif current_diversity > 0.5:  # High diversity, decrease mutation
            self.toolbox.unregister("mutate")
            self.toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)
        else:  # Normal diversity
            self.toolbox.unregister("mutate")
            self.toolbox.register("mutate", tools.mutFlipBit, indpb=0.1)
    
    def neural_architecture_search(self, sector: str):
        """Perform Neural Architecture Search (NAS) for optimal network structure"""
        
        print(f"🔍 Starting Neural Architecture Search for {sector}")
        
        # Define search space for network architectures
        hidden_layer_options = [
            [64, 32],
            [128, 64, 32],
            [256, 128, 64, 32],
            [128, 64],
            [64, 32, 16]
        ]
        
        best_architecture = None
        best_accuracy = 0.0
        
        for architecture in hidden_layer_options:
            # Create and train model with this architecture
            model = SecurityPolicyNetwork(
                input_size=64,
                hidden_sizes=architecture,
                output_size=1
            )
            
            optimizer = optim.Adam(model.parameters(), lr=0.001)
            criterion = nn.BCELoss()
            
            # Quick training
            training_data = self.generate_training_data(sector)
            model.train()
            
            for epoch in range(20):
                optimizer.zero_grad()
                outputs = model(training_data['inputs'])
                loss = criterion(outputs.squeeze(), training_data['labels'])
                loss.backward()
                optimizer.step()
            
            # Evaluate
            model.eval()
            with torch.no_grad():
                predictions = model(training_data['inputs'])
                predicted_labels = (predictions.squeeze() > 0.5).float()
                accuracy = (predicted_labels == training_data['labels']).float().mean()
            
            print(f"   Architecture {architecture}: {accuracy:.3f} accuracy")
            
            if accuracy > best_accuracy:
                best_accuracy = accuracy
                best_architecture = architecture
        
        print(f"🏆 Best architecture for {sector}: {best_architecture} (Accuracy: {best_accuracy:.3f})")
        
        # Update sector model with best architecture
        self.sector_models[sector]['model'] = SecurityPolicyNetwork(
            input_size=64,
            hidden_sizes=best_architecture,
            output_size=1
        )
        
        return best_architecture, best_accuracy
    
    def federated_learning_update(self, external_models: Dict[str, Any]):
        """Update local models with federated learning from other nodes"""
        
        print("🌐 Performing federated learning update")
        
        for sector, model_data in self.sector_models.items():
            if sector in external_models:
                # Simple federated averaging (in practice, would be more sophisticated)
                local_model = model_data['model']
                external_model = external_models[sector]
                
                # Average parameters
                for local_param, external_param in zip(local_model.parameters(), external_model.parameters()):
                    local_param.data = (local_param.data + external_param.data) / 2
        
        print("✅ Federated learning update completed")

def main():
    """Main execution loop"""
    
    try:
        engine = CypherAIGeneticEngine()
        
        # Wait for commands from TypeScript backend
        while True:
            try:
                line = sys.stdin.readline().strip()
                if not line:
                    time.sleep(0.1)
                    continue
                
                command_data = json.loads(line)
                command = command_data.get('command')
                
                if command == 'evolve':
                    sector = command_data.get('sector', 'GENERAL')
                    result = engine.run_evolution(sector)
                    print(f"FITNESS:{json.dumps(result)}")
                    sys.stdout.flush()
                
                elif command == 'nas':
                    sector = command_data.get('sector', 'GENERAL')
                    architecture, accuracy = engine.neural_architecture_search(sector)
                    result = {
                        'sector': sector,
                        'best_architecture': architecture,
                        'accuracy': accuracy
                    }
                    print(f"NAS:{json.dumps(result)}")
                    sys.stdout.flush()
                
                elif command == 'shutdown':
                    print("🛑 Shutting down Python genetic engine")
                    break
                
            except json.JSONDecodeError:
                continue
            except KeyboardInterrupt:
                break
    
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        sys.stderr.flush()

if __name__ == "__main__":
    main()