import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LinkedInProfile } from "@/types";
import { PlusCircle, MinusCircle } from "lucide-react";

interface ProfileEditorProps {
  profile: LinkedInProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: LinkedInProfile) => void;
}

export default function ProfileEditor({ profile, isOpen, onClose, onSave }: ProfileEditorProps) {
  const [formData, setFormData] = useState<LinkedInProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    years: ""
  });
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;
    
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()]
    }));
    setNewSkill("");
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleAddEducation = () => {
    if (!newEducation.institution.trim() || !newEducation.degree.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { ...newEducation }]
    }));
    setNewEducation({
      institution: "",
      degree: "",
      years: ""
    });
  };

  const handleRemoveEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleAddExperience = () => {
    if (!newExperience.title.trim() || !newExperience.company.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...newExperience }]
    }));
    setNewExperience({
      title: "",
      company: "",
      duration: ""
    });
  };

  const handleRemoveExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewEducation(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setNewExperience(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="headline" className="text-right">
              Headline
            </Label>
            <Input
              id="headline"
              name="headline"
              value={formData.headline || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="industry" className="text-right">
              Industry
            </Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentJobTitle" className="text-right">
              Current Job Title
            </Label>
            <Input
              id="currentJobTitle"
              name="currentJobTitle"
              value={formData.currentJobTitle || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentCompany" className="text-right">
              Current Company
            </Label>
            <Input
              id="currentCompany"
              name="currentCompany"
              value={formData.currentCompany || ""}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          {/* Skills Section */}
          <div className="border-t pt-4 mt-2">
            <h3 className="font-medium mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm flex items-center">
                  {skill}
                  <button 
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">
                <PlusCircle className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
          
          {/* Education Section */}
          <div className="border-t pt-4 mt-2">
            <h3 className="font-medium mb-2">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.degree}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{edu.years}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Input
                value={newEducation.institution}
                onChange={(e) => handleEducationChange(e, "institution")}
                placeholder="Institution"
              />
              <Input
                value={newEducation.degree}
                onChange={(e) => handleEducationChange(e, "degree")}
                placeholder="Degree"
              />
              <Input
                value={newEducation.years}
                onChange={(e) => handleEducationChange(e, "years")}
                placeholder="Years (e.g. 2015-2019)"
              />
            </div>
            <Button 
              type="button" 
              onClick={handleAddEducation} 
              variant="outline" 
              className="mt-2 w-full"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Education
            </Button>
          </div>
          
          {/* Experience Section */}
          <div className="border-t pt-4 mt-2">
            <h3 className="font-medium mb-2">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{exp.duration}</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Input
                value={newExperience.title}
                onChange={(e) => handleExperienceChange(e, "title")}
                placeholder="Job Title"
              />
              <Input
                value={newExperience.company}
                onChange={(e) => handleExperienceChange(e, "company")}
                placeholder="Company"
              />
              <Input
                value={newExperience.duration}
                onChange={(e) => handleExperienceChange(e, "duration")}
                placeholder="Duration (e.g. 2020-Present)"
              />
            </div>
            <Button 
              type="button" 
              onClick={handleAddExperience} 
              variant="outline" 
              className="mt-2 w-full"
            >
              <PlusCircle className="h-4 w-4 mr-1" /> Add Experience
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
