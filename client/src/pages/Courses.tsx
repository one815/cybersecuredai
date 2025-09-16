import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MarketingLayout } from "@/components/MarketingLayout";
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
// Use optimized course images from public assets to reduce bundle size
const federalAISecurityCourseImg = "/assets-optimized/AI_Security_Awareness_Training_643d9a03-DEtWvUSL.webp";
const classifiedAISystemsCourseImg = "/assets-optimized/Classified_AI_Systems_Course_4fcc1bcc-D56J064V.webp";
const crossAgencyResponseCourseImg = "/assets-optimized/Cross_Agency_Response_Course_68368323-BlfIwYjK.webp";
const universityResearchSecurityCourseImg = "/assets-optimized/Higher_Education_Security_26849194-CuTgS8vl.webp";
const campusAIImplCourseImg = "/assets-optimized/Campus_AI_Implementation_Course_a7477413-BqdYs9__.webp";
const higherEdSecurityPilotCourseImg = "/assets-optimized/Higher_Ed_Security_Pilot_Course_072466af-DIV3ul0w.webp";
const k12AISecurityEssentialsCourseImg = "/assets-optimized/Educational_Security_Guide_330f6e1c-BQCpH9Yq.webp";
const districtSecurityOpsCourseImg = "/assets-optimized/District_Security_Operations_Course_4131c14e-CMSF2qy4.webp";
const studentAIInteractionsCourseImg = "/assets-optimized/Tech_Administrator_Training_98012fa2-BWvdhqkl.webp";
const certifiedAISecurityProfImg = "/assets-optimized/Higher_Education_Deployment_Kit_e124065f-BlOlTgn9.webp";
const aiIncidentResponseCourseImg = "/assets-optimized/AI_Security_Risk_Assessment_4eae4751-CzGhOj9d.webp";
const secureAIArchitectureCourseImg = "/assets-optimized/AI_Threat_Detection_Engine_58460592-pfdo749l.webp";

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
    title: "Federal AI Security Compliance Mastery",
    sector: "federal",
    description: "Comprehensive training on FISMA compliance, FedRAMP certification, and federal security frameworks. Includes hands-on implementation exercises and assessment tools.",
    fullDescription: "This comprehensive course provides federal IT professionals with deep expertise in AI security compliance requirements. Modules cover FISMA compliance requirements and implementation strategies, FedRAMP certification processes and documentation requirements, federal security assessment tools and methodologies, executive order compliance and adaptation strategies, and inter-agency security coordination protocols. Includes practical exercises using real federal security scenarios.",
    tags: ["federal security training", "government AI protection", "FISMA compliance", "FedRAMP certification", "federal security frameworks"],
    duration: "12 hours",
    level: "Intermediate",
    modules: 16,
    enrolled: "1,247",
    image: federalAISecurityCourseImg,
    keywords: "federal AI security training, government cybersecurity compliance, FISMA implementation, FedRAMP certification course, federal security professional development",
    learningObjectives: [
      "Master FISMA compliance requirements for AI systems",
      "Navigate FedRAMP certification processes",
      "Implement federal security assessment methodologies",
      "Coordinate security across federal agencies"
    ]
  },
  {
    title: "Securing Classified AI Systems",
    sector: "federal", 
    description: "Advanced course for security professionals with appropriate clearance levels. Covers compartmentalized security, multi-level access controls, and classified data protection.",
    fullDescription: "This advanced course addresses the unique challenges of securing AI systems handling classified information. Content includes compartmentalized security architectures and implementation, multi-level security protocols and access controls, classified data handling procedures for AI workloads, threat assessment for nation-state actors, and coordinated response for security incidents involving classified systems. Requires appropriate security clearance for enrollment.",
    tags: ["classified AI security", "government clearance", "sensitive data protection", "national security AI", "compartmented information"],
    duration: "16 hours",
    level: "Advanced",
    modules: 20,
    enrolled: "892",
    image: classifiedAISystemsCourseImg,
    keywords: "classified AI security training, government clearance cybersecurity, sensitive compartmented information, national security AI protection, classified data handling",
    learningObjectives: [
      "Design compartmentalized AI security architectures",
      "Implement multi-level security access controls",
      "Handle classified data in AI processing environments",
      "Coordinate security response for sensitive systems"
    ]
  },
  {
    title: "Cross-Agency AI Security Coordination",
    sector: "federal",
    description: "Master inter-agency collaboration frameworks, unified security operations, and coordinated incident response across federal agencies.",
    fullDescription: "Learn to coordinate AI security efforts across federal agency boundaries. This course covers establishing inter-agency security protocols and communication frameworks, implementing shared threat intelligence platforms and analysis, coordinating incident response across multiple agencies, and standardizing security practices while respecting agency autonomy. Includes case studies from successful multi-agency security initiatives.",
    tags: ["agency collaboration", "government incident response", "cross-agency security", "federal coordination", "unified operations"],
    duration: "10 hours",
    level: "Advanced",
    modules: 15,
    enrolled: "634",
    image: crossAgencyResponseCourseImg,
    keywords: "cross-agency AI security, federal inter-agency coordination, government security collaboration, unified federal protection, multi-agency response",
    learningObjectives: [
      "Establish inter-agency security communication protocols",
      "Implement shared threat intelligence platforms",
      "Coordinate multi-agency incident response",
      "Standardize security practices across agencies"
    ]
  },
  // Higher Education Courses
  {
    title: "University Research AI Security",
    sector: "higher-ed",
    description: "Protect academic research assets while maintaining collaboration and academic freedom. Research data security, intellectual property protection, and collaborative frameworks.",
    fullDescription: "This course addresses the unique security challenges in academic research environments. Content includes academic-specific threats and research vulnerability assessment, research data protection strategies and intellectual property safeguards, collaborative security frameworks that preserve academic freedom, and campus-wide deployment strategies for diverse research environments. Learn proven strategies from successful university implementations.",
    tags: ["research security", "academic protection", "university cybersecurity", "intellectual property", "collaborative research"],
    duration: "8 hours",
    level: "Intermediate",
    modules: 12,
    enrolled: "2,156",
    image: universityResearchSecurityCourseImg,
    keywords: "university AI security, academic research protection, higher education cybersecurity, research data security, scholarly integrity protection",
    learningObjectives: [
      "Assess and mitigate academic-specific AI threats",
      "Implement research data protection strategies",
      "Design collaborative security frameworks",
      "Deploy campus-wide security across diverse departments"
    ]
  },
  {
    title: "Campus-Wide AI Security Implementation",
    sector: "higher-ed",
    description: "Comprehensive course on deploying AI security across university campuses. Multi-department coordination, student privacy considerations, and scalable implementation strategies.",
    fullDescription: "Learn to implement AI security solutions across diverse university environments. This comprehensive course covers multi-department deployment strategies and coordination techniques, student privacy considerations and FERPA compliance, scalable implementation approaches for large campus environments, and stakeholder engagement across academic and administrative units. Includes practical exercises using real university scenarios.",
    tags: ["campus security", "university implementation", "education protection", "multi-department coordination", "student privacy"],
    duration: "10 hours",
    level: "Intermediate",
    modules: 16,
    enrolled: "1,789",
    image: campusAIImplCourseImg,
    keywords: "campus AI security implementation, university deployment strategies, higher education protection, multi-department security, student privacy compliance",
    learningObjectives: [
      "Deploy AI security across multiple university departments",
      "Ensure student privacy and FERPA compliance",
      "Coordinate stakeholders across academic units",
      "Scale security implementations campus-wide"
    ]
  },
  {
    title: "Higher Education Security Pilot Design",
    sector: "higher-ed",
    description: "Design and evaluate AI security pilot programs in academic environments. Experimental frameworks, metrics collection, evaluation methodologies, and scaling strategies.",
    fullDescription: "Master the design and implementation of security pilot programs tailored for higher education. Course content includes pilot program design principles for academic settings, metrics and evaluation frameworks for educational contexts, stakeholder engagement across diverse academic departments, and strategies for scaling successful pilots campus-wide. Features real case studies from successful university security pilot programs.",
    tags: ["education pilots", "academic security testing", "university trials", "pilot design", "security experimentation"],
    duration: "6 hours",
    level: "Advanced",
    modules: 12,
    enrolled: "567",
    image: higherEdSecurityPilotCourseImg,
    keywords: "higher education security pilots, academic security testing, university pilot programs, educational security trials, campus security experiments",
    learningObjectives: [
      "Design effective security pilot programs for academic environments",
      "Implement metrics and evaluation frameworks",
      "Engage stakeholders across diverse academic units",
      "Scale successful pilots to full campus deployment"
    ]
  },
  // K-12 Education Courses
  {
    title: "K-12 AI Security Essentials",
    sector: "k12",
    description: "Fundamental training for K-12 technology leaders. Age-appropriate protections, educational technology security, student safety frameworks, and parental engagement strategies.",
    fullDescription: "This essential course provides K-12 administrators and IT staff with comprehensive AI security training. Content includes school-specific threats and age-appropriate security measures, student safety protocols and privacy protection strategies, classroom technology security and teacher training programs, and parent engagement and communication strategies. Learn practical approaches that maintain educational effectiveness while ensuring student safety.",
    tags: ["school security", "K-12 protection", "student safety", "educational technology", "age-appropriate security"],
    duration: "6 hours",
    level: "Beginner",
    modules: 10,
    enrolled: "3,421",
    image: k12AISecurityEssentialsCourseImg,
    keywords: "K-12 AI security training, school cybersecurity, student safety protection, educational technology security, classroom AI safety",
    learningObjectives: [
      "Implement age-appropriate AI security measures",
      "Design student safety and privacy protocols",
      "Secure classroom technology and educational AI",
      "Engage parents and community in security awareness"
    ]
  },
  {
    title: "District Security Operations Management",
    sector: "k12",
    description: "Centralized management, multi-school coordination, and resource optimization",
    tags: ["school district security", "K-12 operations", "educational administration"],
    duration: "6 hours",
    level: "Intermediate",
    modules: 12,
    enrolled: "1,234",
    image: districtSecurityOpsCourseImg
  },
  {
    title: "Protecting Student AI Interactions",
    sector: "k12",
    description: "Classroom AI tools, student data safeguards, and appropriate security levels",
    tags: ["student interaction security", "classroom AI", "educational data protection"],
    duration: "5 hours",
    level: "Intermediate",
    modules: 10,
    enrolled: "2,867",
    image: studentAIInteractionsCourseImg
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
    enrolled: "5,432",
    image: certifiedAISecurityProfImg
  },
  {
    title: "AI Incident Response and Forensics",
    sector: "general",
    description: "Detection techniques, containment strategies, and post-incident analysis",
    tags: ["incident response", "security forensics", "breach containment"],
    duration: "16 hours",
    level: "Advanced",
    modules: 24,
    enrolled: "2,198",
    image: aiIncidentResponseCourseImg
  },
  {
    title: "Secure AI Architecture and Design",
    sector: "general",
    description: "Design principles, security patterns, and architecture evaluation",
    tags: ["security architecture", "design principles", "secure structures"],
    duration: "12 hours",
    level: "Advanced",
    modules: 18,
    enrolled: "1,876",
    image: secureAIArchitectureCourseImg
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
            className="bg-blue-600 hover:bg-blue-700 text-white border-0 font-semibold min-w-[150px] flex items-center justify-center"
            onClick={() => {
              const slug = course.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
              window.location.href = `/marketing/courses/${slug}`;
            }}
            data-testid="button-access-course"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Course Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const featuredCourses = courses.filter(course => course.enrolled && parseInt(course.enrolled.replace(',', '')) > 2000).slice(0, 3);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                CyberSecured AI Training
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive cybersecurity education designed for Federal Government, Higher Education, and K-12 institutions. 
                Master AI-powered security with sector-specific training programs.
              </p>
              
              {/* Call to Action for Platform Access */}
              <div className="bg-midnight-800/50 border border-spring-400/30 rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-spring-400 mb-4">Access Training Through Our Platform</h2>
                <p className="text-gray-300 mb-6">
                  All courses are available exclusively through the CyberSecured AI platform. Sign up to access our 
                  comprehensive training library with personalized learning paths and real-time progress tracking.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0 font-semibold px-8 py-4 min-w-[200px] flex items-center justify-center"
                    onClick={() => window.location.href = '/dashboard'}
                    data-testid="button-access-platform"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Access Training Platform
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4 min-w-[160px] flex items-center justify-center"
                    onClick={() => window.location.href = '/dashboard'}
                    data-testid="button-start-trial"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  <span>{courses.length} Courses Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Expert-Led Instruction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>Industry Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Courses */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg overflow-hidden">
                  {course.image ? (
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-cyan-400 text-6xl opacity-30">
                        <GraduationCap />
                      </div>
                    </div>
                  )}
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
    </MarketingLayout>
  );
}