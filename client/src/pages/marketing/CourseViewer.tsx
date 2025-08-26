import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Clock, 
  Users, 
  GraduationCap, 
  ArrowLeft,
  CheckCircle,
  BookOpen,
  Award
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

const courseDatabase = {
  'federal-ai-security-fundamentals': {
    title: 'Federal AI Security Fundamentals',
    description: 'Essential security concepts for government AI implementation',
    sector: 'federal',
    duration: '12 hours',
    level: 'Beginner',
    modules: 16,
    enrolled: '3,842',
    instructor: 'Dr. Sarah Mitchell, Federal CISO',
    price: 'Free for Government Employees',
    certification: 'Certificate of Completion',
    curriculum: [
      {
        module: 1,
        title: 'Introduction to AI Security in Government',
        duration: '45 min',
        topics: ['AI security fundamentals', 'Government-specific challenges', 'Regulatory landscape'],
        completed: false
      },
      {
        module: 2,
        title: 'NIST AI Risk Management Framework',
        duration: '60 min',
        topics: ['Framework overview', 'Risk assessment', 'Implementation guidelines'],
        completed: false
      },
      {
        module: 3,
        title: 'Federal Compliance Requirements',
        duration: '50 min',
        topics: ['FedRAMP considerations', 'FISMA integration', 'Executive orders'],
        completed: false
      }
    ],
    prerequisites: 'Basic understanding of cybersecurity principles',
    learningObjectives: [
      'Understand AI security fundamentals in government context',
      'Apply NIST frameworks to AI systems',
      'Implement compliance requirements for federal AI',
      'Develop risk management strategies'
    ]
  },
  
  'k-12-ai-protection-essentials': {
    title: 'K-12 AI Protection Essentials',
    description: 'Student data protection and educational technology security',
    sector: 'k12',
    duration: '8 hours',
    level: 'Beginner',
    modules: 12,
    enrolled: '2,156',
    instructor: 'Jennifer Adams, K-12 Security Expert',
    price: '$299',
    certification: 'K-12 AI Security Certificate',
    curriculum: [
      {
        module: 1,
        title: 'Student Privacy and AI Systems',
        duration: '40 min',
        topics: ['FERPA compliance', 'Student data protection', 'Privacy by design'],
        completed: false
      },
      {
        module: 2,
        title: 'Educational Technology Security',
        duration: '45 min',
        topics: ['Classroom AI tools', 'Learning management systems', 'Device security'],
        completed: false
      }
    ],
    prerequisites: 'Basic knowledge of educational technology',
    learningObjectives: [
      'Protect student data in AI systems',
      'Implement FERPA-compliant AI solutions',
      'Secure educational technology infrastructure',
      'Develop school-specific security policies'
    ]
  }
};

export default function CourseViewer() {
  const params = useParams();
  const courseSlug = params.course;
  const course = courseDatabase[courseSlug as keyof typeof courseDatabase];
  
  if (!course) {
    return (
      <MarketingLayout>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <Card className="bg-gray-800 border-gray-700 p-8 text-center">
            <CardHeader>
              <CardTitle className="text-red-400">Course Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">The requested course could not be found.</p>
              <Link href="/courses">
                <Button variant="outline" className="border-cyan-400 text-cyan-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </MarketingLayout>
    );
  }
  
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-16">
          <div className="container mx-auto px-4">
            <Link href="/courses">
              <Button variant="outline" className="mb-6 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Badge className="mb-4 bg-cyan-600 text-white">{course.level}</Badge>
                <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-xl text-gray-300 mb-6">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {course.modules} modules
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.enrolled} enrolled
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Enroll Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-cyan-400 mb-4">{course.price}</div>
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white mb-4">
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                    <div className="text-sm text-gray-400">
                      <div className="flex justify-between items-center mb-2">
                        <span>Instructor:</span>
                        <span className="text-white">{course.instructor}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Certificate:</span>
                        <span className="text-cyan-400">{course.certification}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Overview */}
              <Card className="bg-gray-800 border-gray-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-white">Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-white font-medium mb-3">Learning Objectives</h3>
                    <ul className="space-y-2">
                      {course.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-start text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium mb-3">Prerequisites</h3>
                    <p className="text-gray-300">{course.prerequisites}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Curriculum */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Course Curriculum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.curriculum.map((module, index) => (
                      <div key={index} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">
                            Module {module.module}: {module.title}
                          </h4>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {module.duration}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="secondary" className="bg-gray-700 text-gray-300 text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="bg-gray-800 border-gray-700 mb-6">
                <CardHeader>
                  <CardTitle className="text-white">Course Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Completion</span>
                      <span className="text-white">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex justify-between items-center mb-2">
                      <span>Completed modules:</span>
                      <span className="text-white">0 / {course.modules}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated time left:</span>
                      <span className="text-white">{course.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Course Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <BookOpen className="w-4 h-4 mr-2 text-cyan-400" />
                      Interactive lessons
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Play className="w-4 h-4 mr-2 text-cyan-400" />
                      Video content
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Award className="w-4 h-4 mr-2 text-cyan-400" />
                      Completion certificate
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-cyan-400" />
                      Community access
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}