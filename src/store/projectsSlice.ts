import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper functions for localStorage
const saveProjects = (projects: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("vcw_projects", JSON.stringify(projects));
  }
};

const loadProjects = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("vcw_projects");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

interface ContentIdea {
  id: string;
  title: string;
  contentIdea: string;
  targetAudience: string;
  contentGoal: string;
  analysis?: any;
  createdAt: number;
  updatedAt: number;
}

interface Hook {
  id: string;
  contentIdeaId: string;
  hookType: string;
  selectedHook?: string;
  generatedHooks?: any;
  createdAt: number;
  updatedAt: number;
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

// Load initial projects
const loadInitialProjects = () => {
  try {
    return loadProjects();
  } catch (error) {
    console.error("Failed to load projects from localStorage:", error);
    return [];
  }
};

// Define initial state
const initialState: ProjectsState = {
  projects: loadInitialProjects(),
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
    
    // Content idea management
    saveContentIdea: (state, action: PayloadAction<{
      contentIdea: string;
      targetAudience: string;
      contentGoal: string;
      analysis?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const contentIdea: ContentIdea = {
        id: Date.now().toString(),
        title: state.currentProject.title,
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        contentIdea,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
        
        // Save to local storage
        saveProjects(state.projects);
      }
    },
    
    // Hook management
    saveHook: (state, action: PayloadAction<{
      hookType: string;
      selectedHook?: string;
      generatedHooks?: any;
    }>) => {
      if (!state.currentProject) return;
      
      const hook: Hook = {
        id: Date.now().toString(),
        contentIdeaId: state.currentProject.contentIdea?.id || "",
        ...action.payload,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      const updatedProject = {
        ...state.currentProject,
        hook,
        updatedAt: Date.now(),
      };
      
      const index = state.projects.findIndex(p => p.id === state.currentProject?.id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
        state.currentProject = updatedProject;
        
        // Save to local storage
        saveProjects(state.projects);
      }
    },
    
    // UI state management
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