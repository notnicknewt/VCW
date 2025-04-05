'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { createProject, setCurrentProject, deleteProject } from '@/store/projectsSlice';
import { getUserProjects, saveProject, deleteProject as deleteFirebaseProject } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Dashboard() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { projects, currentProject } = useSelector((state: RootState) => state.projects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');

  // Load user projects from Firebase
  useEffect(() => {
    const loadProjects = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userProjects = await getUserProjects(user.uid);
        
        // Add projects to Redux store
        userProjects.forEach(project => {
          // Logic to sync Firebase projects with Redux store
          // This would be more complex in a real implementation
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading projects:', error);
        setError('Failed to load your projects');
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [user, dispatch]);

  const handleCreateProject = async () => {
    if (!newProjectTitle.trim() || !user) return;
    
    try {
      // Create project in Redux store
      dispatch(createProject({ title: newProjectTitle }));
      
      // Save to Firebase (in a real implementation, we would use the returned ID)
      if (currentProject) {
        await saveProject(user.uid, currentProject);
      }
      
      setNewProjectTitle('');
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project');
    }
  };

  const handleSelectProject = (projectId: string) => {
    dispatch(setCurrentProject(projectId));
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;
    
    try {
      // Delete from Redux store
      dispatch(deleteProject(projectId));
      
      // Delete from Firebase
      await deleteFirebaseProject(projectId);
    } catch (error) {
      console.error('Error deleting project:', error);
      setError('Failed to delete project');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Viral Content Wizard</h1>
            <div className="flex items-center">
              <span className="mr-4">{user?.displayName || user?.email}</span>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                onClick={() => {/* Sign out logic */}}
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 bg-white">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter project title"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                  />
                  <button
                    onClick={handleCreateProject}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                ) : projects.length === 0 ? (
                  <p className="text-gray-500">You don't have any projects yet. Create one to get started!</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Created: {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between">
                          <Link
                            href={`/project/${project.id}/idea`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleSelectProject(project.id)}
                          >
                            {project.contentIdea ? 'Continue' : 'Start'}
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
