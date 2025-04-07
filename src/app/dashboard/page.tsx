"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/store/projectsSlice";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { projects, loading } = useSelector((state: any) => state.projects);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  
  const handleCreateProject = () => {
    if (!newProjectTitle) return;
    
    dispatch(createProject({ title: newProjectTitle }));
    setNewProjectTitle("");
    
    // Get the ID of the project we just created (last in the array)
    const newProjects = [...projects, { title: newProjectTitle, id: Date.now().toString() }];
    router.push(`/dashboard/${newProjects[newProjects.length - 1].id}`);
  };
  
  const handleSelectProject = (projectId: string) => {
    router.push(`/dashboard/${projectId}`);
  };
  
  // Calculate progress percentage for a project
  const getProgressPercentage = (project: any): number => {
    let steps = 0;
    const totalSteps = 5; // Total number of steps in the wizard
    
    if (project.contentIdea) steps++;
    if (project.hook) steps++;
    if (project.contentStructure) steps++;
    if (project.caption) steps++;
    if (project.performance) steps++;
    
    return Math.round((steps / totalSteps) * 100);
  };
  
  // Get a label describing the current progress
  const getProgressLabel = (project: any): string => {
    if (!project.contentIdea) return "Not started";
    if (!project.hook) return "Content idea created";
    if (!project.contentStructure) return "Hook generated";
    if (!project.caption) return "Content structure defined";
    if (!project.performance) return "Captions generated";
    return "Completed";
  };
  
  return (
    <div className="dashboard-container p-6 max-w-6xl mx-auto">
      <div className="dashboard-header text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Viral Content Wizard</h1>
        <p className="text-gray-600">Create, optimize, and analyze your short-form video content</p>
      </div>
      
      <div className="dashboard-grid grid gap-6 md:grid-cols-2">
        <div className="create-project-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <p className="text-gray-600 mb-4">Start a new viral content idea from scratch</p>
          
          <div className="input-group flex">
            <input
              type="text"
              className="flex-1 border rounded-l-md p-2 outline-none"
              value={newProjectTitle}
              placeholder="Enter a project title"
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition disabled:opacity-50"
              onClick={handleCreateProject}
              disabled={!newProjectTitle}
            >
              Create Project
            </button>
          </div>
        </div>
        
        <div className="projects-list-card bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
          
          {loading ? (
            <div className="loading-indicator text-center p-4">
              <p>Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="empty-projects text-center p-4">
              <p className="text-gray-600">You don't have any projects yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="projects-grid space-y-4">
              {projects.map((project: any) => (
                <div 
                  key={project.id} 
                  className="project-card border rounded-md p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => handleSelectProject(project.id)}
                >
                  <div className="project-info">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      Created: {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                    
                    <div className="project-progress bg-gray-200 h-2 rounded-full mb-1">
                      <div 
                        className="progress-bar bg-purple-600 h-full rounded-full"
                        style={{
                          width: `${getProgressPercentage(project)}%`
                        }}
                      ></div>
                    </div>
                    <div className="progress-label text-xs text-gray-600">
                      {getProgressLabel(project)} ({getProgressPercentage(project)}%)
                    </div>
                  </div>
                  
                  <div className="project-actions mt-4 text-right">
                    <button className="text-purple-600 font-medium hover:text-purple-800 transition">
                      {project.contentIdea ? "Continue" : "Start"}
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
