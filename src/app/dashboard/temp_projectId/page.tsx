"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "@/store/slices/projectsSlice";
import type { RootState } from "@/store";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: RootState) => state.projects);
  
  useEffect(() => {
    if (projectId) {
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
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{currentProject.title}</h1>
        <button 
          className="text-purple-600 hover:text-purple-800"
          onClick={() => router.push("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Content Wizard</h2>
        
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
          <p className="text-yellow-700">
            This is where the full wizard interface will be implemented with:
          </p>
          <ul className="list-disc ml-5 mt-2 text-yellow-800">
            <li>Step-by-step guidance</li>
            <li>Content idea analysis</li>
            <li>Hook generation</li>
            <li>Structure optimization</li>
            <li>Caption and hashtag suggestions</li>
          </ul>
        </div>
        
        <p className="text-gray-600 mb-4">
          The wizard will guide you through creating viral short-form video content 
          with AI-powered suggestions and feedback at each step.
        </p>
      </div>
    </div>
  );
}
