"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "@/store/projectsSlice";
import dynamic from "next/dynamic";

// Use dynamic import with no SSR to avoid hydration issues
const WizardLayout = dynamic(() => import("@/components/wizard/WizardLayout"), { 
  ssr: false 
});

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  
  const dispatch = useDispatch();
  const { currentProject, projects, loading } = useSelector((state: any) => state.projects);
  const [isClient, setIsClient] = useState(false);
  
  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (projectId) {
      dispatch(setCurrentProject(projectId));
    }
  }, [projectId, dispatch]);
  
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
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
          <p className="text-gray-600 mb-4">The project you are looking for doesn't exist.</p>
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            onClick={() => router.push("/dashboard")}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="project-page">
      <header className="bg-white shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-xl font-bold">{currentProject.title}</h1>
          <button 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </header>
      
      <WizardLayout />
    </div>
  );
}