import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper functions for localStorage
const saveProjects = (projects: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vcw_projects", JSON.stringify(projects));
  }
};

const loadProjects = () => {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem("vcw_projects");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading projects from localStorage:", error);
      return [];
    }
  }
  return [];
};

// Define types for our state
interface ContentIdea {
  contentIdea: string;
  targetAudience: string;
  contentGoal: string;
  analysis?: any;
}

interface Hook {
  hookType: string;
  selectedHook?: string;
  generatedHooks?: any;
}

interface Project {
  id: string;
  title: string;
  contentIdea?: ContentIdea;
  hook?: Hook;
  createdAt: number;
  updatedAt: number;
}

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: ProjectsState = {
  projects: loadProjects(),
  currentProject: null,
  loading: false,
  error: null,
};

// Create slice
const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Project management
    createProject: (state, action: PayloadAction<{ title: string }>) => {
      const newProject: Project = {
        id: Date.now().toString(),
        title: action.payload.title,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      state.projects.push(newProject);
      state.currentProject = newProject;
      
      // Save to local storage
      saveProjects(state.projects);
    },
    
    setCurrentProject: (state, action: PayloadAction<string>) => {
      const project = state.projects.find(p => p.id === action.payload);
      if (project) {
        state.currentProject = project;
      }
    },
    
    saveContentIdea: (state, action: PayloadAction<ContentIdea>) => {
      if (!state.currentProject) return;
      
      // Update current project with content idea
      state.currentProject = {
        ...state.currentProject,
        contentIdea: action.payload,
        updatedAt: Date.now(),
      };
      
      // Update the project in the projects array
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = state.currentProject;
      }
      
      // Save to local storage
      saveProjects(state.projects);
    },
    
    saveHook: (state, action: PayloadAction<Hook>) => {
      if (!state.currentProject) return;
      
      // Update current project with hook
      state.currentProject = {
        ...state.currentProject,
        hook: action.payload,
        updatedAt: Date.now(),
      };
      
      // Update the project in the projects array
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = state.currentProject;
      }
      
      // Save to local storage
      saveProjects(state.projects);
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  createProject,
  setCurrentProject,
  saveContentIdea,
  saveHook,
  setLoading,
  setError,
} = projectsSlice.actions;

export default projectsSlice.reducer;