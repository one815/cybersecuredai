import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Clock,
  GraduationCap,
  Building,
  School,
  Shield,
  Users,
  ExternalLink,
  Play,
  Filter
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
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const sectorNames = ["Federal Government", "Higher Education", "K-12 Education", "General"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sector => {
      if (sector === "Federal Government") return course.sector === "federal";
      if (sector === "Higher Education") return course.sector === "higher-ed";
      if (sector === "K-12 Education") return course.sector === "k12";
      if (sector === "General") return course.sector === "general";
      return false;
    });
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    return matchesSearch && matchesSector && matchesLevel;
  });

  const handleSectorChange = (sector: string, checked: boolean) => {
    if (checked) {
      setSelectedSectors([...selectedSectors, sector]);
    } else {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    }
  };

  const handleLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      setSelectedLevels([...selectedLevels, level]);
    } else {
      setSelectedLevels(selectedLevels.filter(l => l !== level));
    }
  };

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
          <Button 
            size="sm" 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            onClick={() => window.open(`/marketing/courses/${course.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
          >
            <Play className="w-4 h-4 mr-1" />
            Enroll Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const featuredCourses = courses.filter(course => course.enrolled && parseInt(course.enrolled.replace(',', '')) > 2000).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Training Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Comprehensive AI security training courses for all skill levels and sectors
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Courses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center">
                  <div className="text-cyan-400 text-6xl opacity-30">
                    <GraduationCap />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                      {course.level}
                    </Badge>
                    <Button 
                      className="bg-cyan-600 hover:bg-cyan-700 text-white"
                      onClick={() => window.open(`/marketing/courses/${course.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Courses Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All Courses</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <Card className="bg-gray-800 border-gray-700 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter by
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Sectors */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Sector</h3>
                    <div className="space-y-2">
                      {sectorNames.map((sector) => (
                        <div key={sector} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sector-${sector}`}
                            checked={selectedSectors.includes(sector)}
                            onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`sector-${sector}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {sector}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Levels */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Level</h3>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox
                            id={`level-${level}`}
                            checked={selectedLevels.includes(level)}
                            onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`level-${level}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {level}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Courses Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredCourses.length} of {courses.length} courses
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredCourses.length} results
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-16">
                  <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No courses found</div>
                  <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSectors([]);
                      setSelectedLevels([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}