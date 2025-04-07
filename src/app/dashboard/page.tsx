"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/store/slices/projectsSlice";
import type { RootState } from "@/store";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state: RootState) => state.projects);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  
  const handleCreateProject = () => {
    if (!newProjectTitle.trim()) return;
    
    dispatch(createProject({ title: newProjectTitle }));
    setNewProjectTitle("");
    
    // Navigate to the new project after a short delay to allow state to update
    setTimeout(() => {
      const newProject = projects[projects.length - 1];
      if (newProject) {
        router.push(`/dashboard/${newProject.id}`);
      }
    }, 100);
  };
  
  const handleSelectProject = (projectId: string) => {
    router.push(`/dashboard/${projectId}`);
  };
  
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Viral Content Wizard</h1>
        <p className="text-gray-600">Create, optimize, and analyze your short-form video content</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <p className="text-gray-600 mb-4">Start a new viral content idea from scratch</p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleCreateProject();
          }}>
            <div className="flex">
              <input 
                type="text"
                className="flex-1 border rounded-l-md p-2 outline-none"
                value={newProjectTitle}
                placeholder="Enter a project title"
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition disabled:opacity-50"
                disabled={!newProjectTitle.trim()}
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          
          {loading ? (
            <div className="text-center p-4">
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-600">You don't have any projects yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="border rounded-md p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => handleSelectProject(project.id)}
                >
                  <div className="project-info">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <button 
                      className="text-purple-600 font-medium hover:text-purple-800 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectProject(project.id);
                      }}
                    >
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
