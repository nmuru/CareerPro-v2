import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LinkedInProfile } from "@/types";
import { MapPin, Building, GraduationCap, Briefcase } from "lucide-react";

interface ProfileCardProps {
  profile: LinkedInProfile;
  onEdit: () => void;
}

export default function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="relative">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-[#0077B5] to-[#48A3C6] rounded-t-lg"></div>
        
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 flex items-center justify-center">
            {profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      {/* Profile Info */}
      <CardContent className="pt-14 px-6 pb-6">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-semibold">{profile.name}</h3>
              {profile.headline && (
                <p className="text-lg text-gray-700 dark:text-gray-300">{profile.headline}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={onEdit}>
              Edit Profile
            </Button>
          </div>
          
          {profile.location && (
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{profile.location}</span>
            </p>
          )}
        </div>
        
        {/* Current Position */}
        {(profile.currentJobTitle || profile.currentCompany) && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
              Current Position
            </h4>
            <div className="flex items-start mb-2">
              <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                <Building className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </div>
              <div>
                {profile.currentJobTitle && (
                  <p className="font-medium">{profile.currentJobTitle}</p>
                )}
                {profile.currentCompany && (
                  <p className="text-gray-600 dark:text-gray-400">{profile.currentCompany}</p>
                )}
                {profile.industry && (
                  <p className="text-sm text-gray-500 dark:text-gray-500">{profile.industry}</p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
              Education
            </h4>
            {profile.education.map((edu, index) => (
              <div key={index} className="flex items-start mb-2">
                <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                  <GraduationCap className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{edu.institution}</p>
                  <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{edu.years}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {profile.experience && profile.experience.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
              Experience
            </h4>
            {profile.experience.map((exp, index) => (
              <div key={index} className="flex items-start mb-2">
                <div className="w-12 h-12 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{exp.duration}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
