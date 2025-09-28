import { create } from "zustand";

const componentsList = {
  navbar: { 
    id: "navbar", 
    label: "Navbar", 
    type: "navbar",
    defaultProps: {
      siteName: "My Website",
      menuItems: ["Home", "About", "Services", "Contact"],
      backgroundColor: "bg-blue-600",
      textColor: "text-white"
    }
  },
  hero: { 
    id: "hero", 
    label: "Hero Section", 
    type: "hero",
    defaultProps: {
      title: "Welcome to Our Amazing Website!",
      subtitle: "Build beautiful websites with our drag-and-drop builder",
      buttonText: "Get Started",
      backgroundColor: "bg-gradient-to-r from-indigo-500 to-purple-600"
    }
  },
  testimonials: { 
    id: "testimonials", 
    label: "Testimonials", 
    type: "testimonials",
    defaultProps: {
      title: "What Our Clients Say",
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "CEO, Tech Corp",
          text: "This platform transformed our business operations. Highly recommended!",
          rating: 5
        },
        {
          name: "Mike Chen",
          role: "Founder, StartupXYZ", 
          text: "Outstanding service and support. The team went above and beyond.",
          rating: 5
        },
        {
          name: "Emily Davis",
          role: "Marketing Director",
          text: "Easy to use and incredibly effective. Results exceeded our expectations.",
          rating: 5
        }
      ],
      backgroundColor: "bg-gray-50"
    }
  },
  footer: { 
    id: "footer", 
    label: "Footer", 
    type: "footer",
    defaultProps: {
      siteName: "My Website",
      description: "Building the future, one component at a time.",
      links: ["Privacy", "Terms", "Support"],
      copyright: "© 2025 My Website. All rights reserved."
    }
  },
  content: { 
    id: "content", 
    label: "Content Block", 
    type: "content",
    defaultProps: {
      title: "About Our Services",
      leftTitle: "What We Do",
      leftContent: "We provide cutting-edge solutions that help businesses grow and succeed in the digital world. Our team of experts works tirelessly to deliver exceptional results.",
      rightTitle: "Why Choose Us",
      rightList: [
        "Expert team with years of experience",
        "Cutting-edge technology solutions", 
        "24/7 customer support",
        "Proven track record of success"
      ]
    }
  },
  cta: { 
    id: "cta", 
    label: "Call to Action", 
    type: "cta",
    defaultProps: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of satisfied customers and transform your business today.",
      primaryButton: "Start Free Trial",
      secondaryButton: "Learn More",
      backgroundColor: "bg-orange-500"
    }
  },
};

export const useBuilderStore = create((set) => ({
  available: componentsList,
  dropped: [],
  selectedComponent: null,
  
  addComponent: (componentType) =>
    set((state) => {
      const component = state.available[componentType];
      if (component) {
        const newComponent = {
          ...component,
          uniqueId: `${componentType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          props: { ...component.defaultProps },
        };
        return { dropped: [...state.dropped, newComponent] };
      }
      return state;
    }),
    
  removeComponent: (uniqueId) =>
    set((state) => ({
      dropped: state.dropped.filter((c) => c.uniqueId !== uniqueId),
      selectedComponent: state.selectedComponent?.uniqueId === uniqueId ? null : state.selectedComponent,
    })),
    
  reorderComponents: (newOrder) =>
    set(() => ({ dropped: newOrder })),
    
  selectComponent: (component) =>
    set(() => ({ selectedComponent: component })),
    
  updateComponentProps: (uniqueId, newProps) =>
    set((state) => ({
      dropped: state.dropped.map((component) =>
        component.uniqueId === uniqueId
          ? { ...component, props: { ...component.props, ...newProps } }
          : component
      ),
      selectedComponent: state.selectedComponent?.uniqueId === uniqueId 
        ? { ...state.selectedComponent, props: { ...state.selectedComponent.props, ...newProps } }
        : state.selectedComponent,
    })),
    
  duplicateComponent: (uniqueId) =>
    set((state) => {
      const componentToDuplicate = state.dropped.find(c => c.uniqueId === uniqueId);
      if (componentToDuplicate) {
        const duplicatedComponent = {
          ...componentToDuplicate,
          uniqueId: `${componentToDuplicate.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        };
        const insertIndex = state.dropped.findIndex(c => c.uniqueId === uniqueId) + 1;
        const newDropped = [...state.dropped];
        newDropped.splice(insertIndex, 0, duplicatedComponent);
        return { dropped: newDropped };
      }
      return state;
    }),
}));