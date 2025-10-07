# 🎨 Case Study Visual Components Guide

Use these components in your MDX case studies to make them more engaging and visual.

## Available Components

### 1. **Callout** - Highlighted Information Boxes

```mdx
import { Callout } from "@/components/ui/callout";

<Callout type="info" title="Key Insight">
  This highlights important information with an icon and colored background.
</Callout>

<Callout type="success" title="Result">
  Great for showing positive outcomes and achievements.
</Callout>

<Callout type="warning" title="Challenge">
  Perfect for highlighting problems or warnings.
</Callout>

<Callout type="insight" title="Technical Decision">
  Use for explaining why you made certain choices.
</Callout>

<Callout type="metric" title="Performance Impact">
  Ideal for highlighting metrics and KPIs.
</Callout>
```

### 2. **StatsGrid** - Visual Metrics Display

```mdx
import { StatsGrid } from "@/components/ui/stats-grid";

<StatsGrid
  stats={[
    {
      label: "Response Time",
      value: "120ms",
      change: "87% faster",
      trend: "up",
    },
    {
      label: "Throughput",
      value: "10K req/s",
      change: "3x increase",
      trend: "up",
    },
    {
      label: "Error Rate",
      value: "0.01%",
      change: "99% reduction",
      trend: "down",
    },
  ]}
  columns={3}
/>
```

### 3. **ArchitectureDiagram** - System Architecture Visualization

```mdx
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";

<ArchitectureDiagram
  title="Platform Architecture"
  nodes={[
    { id: "client", label: "React App", icon: "layers" },
    { id: "api", label: "API Gateway", icon: "server" },
    { id: "lambda", label: "AWS Lambda", icon: "cloud" },
    { id: "db", label: "Database", icon: "database" },
  ]}
  connections={[
    { from: "client", to: "api", label: "HTTPS" },
    { from: "api", to: "lambda", label: "Process" },
    { from: "lambda", to: "db", label: "Query" },
  ]}
/>
```

### 4. **ComparisonTable** - Before/After Comparisons

```mdx
import { ComparisonTable } from "@/components/ui/comparison-table";

<ComparisonTable
  title="Platform Improvements"
  beforeLabel="Legacy System"
  afterLabel="New Platform"
  rows={[
    { label: "Deployment Time", before: "2 hours", after: "5 minutes" },
    { label: "Automated Testing", before: false, after: true },
    { label: "API Response Time", before: "500ms", after: "50ms" },
  ]}
/>
```

### 5. **Timeline** - Project Milestones

```mdx
import { Timeline } from "@/components/ui/timeline";

<Timeline
  items={[
    {
      title: "Discovery & Planning",
      description: "Analyzed requirements and defined architecture",
      date: "Q1 2024",
    },
    {
      title: "MVP Development",
      description: "Built core features and infrastructure",
      date: "Q2 2024",
    },
    {
      title: "Production Launch",
      description: "Deployed to production with monitoring",
      date: "Q3 2024",
    },
  ]}
/>
```

## Enhanced Prose Styling

All case studies automatically get:

- ✨ Scroll-triggered animations on headings and paragraphs
- 🎨 Syntax highlighted code blocks
- 📊 Beautiful table styling
- 💬 Styled blockquotes
- 🔗 Hover effects on links
- 📸 Rounded images with scale animations

## Tips for Great Case Studies

1. **Start with Impact** - Use StatsGrid at the top to show results
2. **Visualize Architecture** - Use ArchitectureDiagram for technical systems
3. **Highlight Insights** - Use Callouts for important points
4. **Show Progress** - Use Timeline for project milestones
5. **Compare Results** - Use ComparisonTable for before/after
6. **Break up Text** - Use these components every 2-3 paragraphs

## Example Structure

```mdx
---
title: "My Awesome Project"
# ... frontmatter
---

## The Challenge

Brief introduction to the problem...

<Callout type="warning" title="The Core Issue">
  Main problem statement
</Callout>

## The Solution

<ArchitectureDiagram
  title="System Architecture"
  nodes={...}
/>

### Performance Results

<StatsGrid
  stats={[...]}
/>

## Implementation Timeline

<Timeline
  items={[...]}
/>

## Results Comparison

<ComparisonTable
  rows={[...]}
/>

<Callout type="success" title="Final Outcome">
  Summary of achievements
</Callout>
```


