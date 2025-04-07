'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProject } from '@/store/projectsSlice';
import WizardLayout from '@/components/wizard/WizardLayout';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  
  const dispatch = useDispatch();
  const { currentProject, projects, loading } = useSelector((state: any) => state.projects);
  
  useEffect(() => {
    if (projectId) {
      dispatch(setCurrentProject(projectId));
    }
  }, [projectId, dispatch]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }
  
  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist or has been deleted.</p>
          <a href="/dashboard" className="inline-block mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }
  
  return <WizardLayout />;
}
