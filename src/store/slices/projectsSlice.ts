import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type definitions
interface Project {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  // Content components will be added later
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

// Helper to load projects from localStorage
const loadProjectsFromStorage = (): Project[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedProjects = localStorage.getItem('vcw_projects');
    return storedProjects ? JSON.parse(storedProjects) : [];
  } catch (error) {
    console.error('Failed to load projects from localStorage:', error);
    return [];
  }
};

// Initial state
const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Create the slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Initialize projects from localStorage (called on app load)
    initializeProjects: (state) => {
      state.projects = loadProjectsFromStorage();
    },
    
    // Create a new project
    createProject: (state, action: PayloadAction<{ title: string }>) => {
      const newProject: Project = {
        id: Date.now().toString(),
        title: action.payload.title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      state.projects.push(newProject);
      state.currentProject = newProject;
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('vcw_projects', JSON.stringify(state.projects));
      }
    },
    
    // Set the current project
    setCurrentProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = project;
      }
    },
    
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  initializeProjects,
  createProject,
  setCurrentProject,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;
