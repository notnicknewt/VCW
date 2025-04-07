"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import WizardLayout from "@/components/wizard/WizardLayout";
import { setCurrentProject } from "@/store/slices/projectsSlice";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  
  const dispatch = useDispatch();
  const { currentProject, projects, loading } = useSelector((state: any) => state.projects);
  
  useEffect(() => {
    if (projectId) {
      console.log("Setting current project:", projectId);
      dispatch(setCurrentProject(projectId));
    }
  }, [projectId, dispatch]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your project...</p>
        </div>
      </div>
    );
  }
  
  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you are looking for does not exist.</p>
          <a 
            href="/dashboard"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition inline-block"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }
  
  return <WizardLayout />;
}
