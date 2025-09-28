# 🎨 Website Builder - Next.js Drag & Drop

A powerful drag-and-drop website builder built with Next.js, React DnD Kit, and Tailwind CSS. Create beautiful websites by simply dragging components onto a canvas and arranging them visually.

## ✨ Features

- **Drag & Drop Interface**: Drag components from the palette to the canvas
- **Reorderable Components**: Rearrange components by dragging them up or down
- **Component Library**: Pre-built components including:
  - 📋 Navbar
  - 🎯 Hero Section
  - 📄 Content Block
  - 🚀 Call to Action
  - 🔗 Footer
- **Export Functionality**: Export your design structure as JSON
- **Responsive Design**: All components are mobile-responsive
- **Real-time Preview**: See changes instantly as you build

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **@dnd-kit** - Modern drag and drop toolkit
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework

## 🎯 How to Use

1. **Drag Components**: Drag any component from the left palette to the canvas
2. **Reorder**: Use the drag handle (⋮⋮) to reorder components
3. **Remove**: Click the × button to remove components
4. **Export**: Click "Export Structure" to get JSON representation
5. **Clear**: Use "Clear All" to start over

## 📦 Component Structure

Each component is self-contained and includes:
- Unique styling with Tailwind CSS
- Responsive design patterns
- Professional visual hierarchy
- Interactive elements

## 🔧 Extending the Builder

### Adding New Components

1. Create a new component in `src/components/`
2. Add it to the `componentMap` in `DropArea.js`
3. Register it in the store (`useBuilderStore.js`)
4. Add an icon to the palette

### Customizing Styles

All styling uses Tailwind CSS. Modify the component files to change:
- Colors and themes
- Layout and spacing
- Typography and effects

## 📈 Future Enhancements

- [ ] Component editing (text, images, colors)
- [ ] Save/load from database
- [ ] Template library
- [ ] Custom CSS injection
- [ ] Mobile preview mode
- [ ] SEO metadata editing
- [ ] Animation controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js and modern web technologies.
