# VitaWave Logo Component

This document provides guidance on using the VitaWave Logo component throughout the application.

## Overview

The Logo component is a reusable React component that provides consistent branding across the VitaWave app. It uses SVG for high-quality, scalable graphics that look great on all device sizes.

## Features

- **Multiple sizes**: Small, medium, and large variants for different contexts
- **Multiple variants**: 
  - `icon-only`: Just the logo icon
  - `text-only`: Just the VitaWave text
  - `full`: Both the icon and text
- **Customizable colors**: Background and text colors can be customized
- **Flexible background**: Can be shown with or without a background

## Usage

Import the Logo component:

```jsx
import Logo from './components/Logo';
```

### Basic Usage

```jsx
// Default medium size with icon and text
<Logo />
```

### Size Variants

```jsx
// Small size
<Logo size="small" />

// Medium size (default)
<Logo size="medium" />

// Large size
<Logo size="large" />
```

### Display Variants

```jsx
// Icon only (no text)
<Logo variant="icon-only" />

// Text only (no icon)
<Logo variant="text-only" />

// Full logo with icon and text (default)
<Logo variant="full" />
```

### Color Customization

```jsx
// Custom background color
<Logo backgroundColorClass="bg-green-600" />

// Custom text color
<Logo textColorClass="text-gray-800" />

// No background
<Logo showBackground={false} />
```

### Example Use Cases

1. **Splash Screen**: Use large icon-only on a colored background
   ```jsx
   <Logo size="large" variant="icon-only" backgroundColorClass="bg-white" />
   ```

2. **Login/Signup Pages**: Use medium full logo
   ```jsx
   <Logo size="medium" variant="full" />
   ```

3. **Headers**: Use small icon-only without background
   ```jsx
   <Logo size="small" variant="icon-only" showBackground={false} />
   ```

4. **Footers**: Use small text-only
   ```jsx
   <Logo size="small" variant="text-only" textColorClass="text-gray-500" />
   ```

## Design Elements

The logo consists of three main elements symbolizing healthcare and community:

1. A heartbeat line (EKG) representing health monitoring
2. A wave element symbolizing the flow of care and information
3. A stylized letter "V" representing VitaWave's commitment to victory over health challenges

The color scheme adapts based on the background, maintaining excellent contrast and visibility in all contexts. 