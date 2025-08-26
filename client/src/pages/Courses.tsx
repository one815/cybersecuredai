import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Clock,
  GraduationCap,
  Building,
  School,
  Shield,
  Users,
  ExternalLink,
  Play
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const courses = [
  // Federal Government Courses
  {
    title: "Federal AI Security Fundamentals",
    sector: "federal",
    description: "Government-specific threats, FISMA compliance, and federal security frameworks",
    tags: ["federal security training", "government AI protection", "FISMA compliance"],
    duration: "8 hours",
    level: "Intermediate",
    modules: 12,
    enrolled: "1,247"
  },
  {
    title: "Securing Classified AI Systems",
    sector: "federal", 
    description: "Compartmentalized security, clearance-level access controls, and sensitive data handling",
    tags: ["classified AI security", "government clearance", "sensitive data protection"],
    duration: "12 hours",
    level: "Advanced",
    modules: 18,
    enrolled: "892"
  },
  {
    title: "Cross-Agency Threat Response",
    sector: "federal",
    description: "Collaborative incident management, unified security operations, and inter-agency coordination",
    tags: ["agency collaboration", "government incident response", "cross-agency security"],
    duration: "10 hours",
    level: "Advanced",
    modules: 15,
    enrolled: "634"
  },
  // Higher Education Courses
  {
    title: "University Research Security",
    sector: "higher-ed",
    description: "Academic-specific threats, research data protection, and scholarly integrity safeguards",
    tags: ["research security", "academic protection", "university cybersecurity"],
    duration: "6 hours",
    level: "Intermediate",
    modules: 10,
    enrolled: "2,156"
  },
  {
    title: "Campus AI Security Implementation",
    sector: "higher-ed",
    description: "Multi-department deployment, student privacy considerations, and campus-wide coordination",
    tags: ["campus security", "university implementation", "education protection"],
    duration: "8 hours",
    level: "Intermediate",
    modules: 14,
    enrolled: "1,789"
  },
  {
    title: "Higher Education Security Pilot Design",
    sector: "higher-ed",
    description: "Experimental security frameworks, metrics collection, and academic pilot assessment",
    tags: ["education pilots", "academic security testing", "university trials"],
    duration: "6 hours",
    level: "Advanced",
    modules: 12,
    enrolled: "567"
  },
  // K-12 Education Courses
  {
    title: "K-12 AI Security Essentials",
    sector: "k12",
    description: "Age-appropriate protections, educational technology security, and student safety frameworks",
    tags: ["school security", "K-12 protection", "student safety"],
    duration: "4 hours",
    level: "Beginner",
    modules: 8,
    enrolled: "3,421"
  },
  {
    title: "District Security Operations",
    sector: "k12",
    description: "Centralized management, multi-school coordination, and resource optimization",
    tags: ["school district security", "K-12 operations", "educational administration"],
    duration: "6 hours",
    level: "Intermediate",
    modules: 12,
    enrolled: "1,234"
  },
  {
    title: "Protecting Student AI Interactions",
    sector: "k12",
    description: "Classroom AI tools, student data safeguards, and appropriate security levels",
    tags: ["student interaction security", "classroom AI", "educational data protection"],
    duration: "5 hours",
    level: "Intermediate",
    modules: 10,
    enrolled: "2,867"
  },
  // General Courses
  {
    title: "Certified AI Security Professional",
    sector: "general",
    description: "Foundational concepts, threat modeling, secure coding practices, and hands-on labs",
    tags: ["security certification", "professional training", "AI security skills"],
    duration: "40 hours",
    level: "Advanced",
    modules: 48,
    enrolled: "5,432"
  },
  {
    title: "AI Incident Response and Forensics",
    sector: "general",
    description: "Detection techniques, containment strategies, and post-incident analysis",
    tags: ["incident response", "security forensics", "breach containment"],
    duration: "16 hours",
    level: "Advanced",
    modules: 24,
    enrolled: "2,198"
  },
  {
    title: "Secure AI Architecture and Design",
    sector: "general",
    description: "Design principles, security patterns, and architecture evaluation",
    tags: ["security architecture", "design principles", "secure structures"],
    duration: "12 hours",
    level: "Advanced",
    modules: 18,
    enrolled: "1,876"
  }
];

export default function Courses() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || course.sector === selectedSector;
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesSector && matchesLevel;
  });

  const CourseCard = ({ course }: { course: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {course.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {course.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <Badge variant="outline" className="text-cyan-400 border-cyan-400">
              {course.level}
            </Badge>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <GraduationCap className="w-4 h-4 mr-1" />
            {course.modules} modules
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {course.enrolled} enrolled
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${course.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${course.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${course.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${course.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {sectors.find(s => s.id === course.sector)?.name}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <Play className="w-4 h-4 mr-1" />
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Training Courses
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Comprehensive AI security training courses for all skill levels and sectors
          </p>
          
          {/* Course Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{courses.length}</div>
                <div className="text-sm text-gray-400">Total Courses</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{courses.reduce((acc, course) => acc + parseInt(course.enrolled.replace(',', '')), 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Students Enrolled</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{courses.reduce((acc, course) => acc + course.modules, 0)}</div>
                <div className="text-sm text-gray-400">Learning Modules</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{sectors.length - 1}</div>
                <div className="text-sm text-gray-400">Sectors Covered</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-400 font-medium">Sector:</span>
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <Button
                    key={sector.id}
                    variant={selectedSector === sector.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSector(sector.id)}
                    className={`
                      ${selectedSector === sector.id 
                        ? 'bg-cyan-600 text-white' 
                        : 'border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {sector.name}
                  </Button>
                );
              })}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-400 font-medium">Level:</span>
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className={`
                    ${selectedLevel === level 
                      ? 'bg-cyan-600 text-white' 
                      : 'border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
                    }
                  `}
                >
                  {level === "all" ? "All Levels" : level}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Available Courses</h2>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {filteredCourses.length} courses
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-400 text-lg mb-2">No courses found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}