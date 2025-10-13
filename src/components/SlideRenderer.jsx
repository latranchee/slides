import React from 'react';
import { H1, H2, H3, Body, Quote, Number } from './base/Typography';
import StatCard from './base/StatCard';
import IconGrid from './base/IconGrid';
import ComparisonBar from './charts/ComparisonBar';
import SimplePieChart from './charts/SimplePieChart';
import Timeline from './charts/Timeline';
import BellCurve from './charts/BellCurve';
import VerticalBarChart from './charts/VerticalBarChart';
import * as Icons from 'lucide-react';
import { useStyles } from '../contexts/StyleContext';

// Helper to get icon component from string name
const getIcon = (iconName, size = 48) => {
  if (!iconName) return null;
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent size={size} /> : null;
};

const SlideRenderer = ({ slide }) => {
  const { type, content, background } = slide;
  const styles = useStyles();

  // Use default background if slide doesn't specify one
  const effectiveBackground = background || styles.defaultBackground || { type: 'color', value: '#FFFFFF' };

  // Determine if this slide should use dark theme (light text on dark background)
  const isDarkTheme = () => {
    // Check if theme is explicitly set
    if (content?.theme === 'dark' || slide.theme === 'dark') {
      return true;
    }
    if (content?.theme === 'light' || slide.theme === 'light') {
      return false;
    }

    // Auto-detect based on background color brightness
    if (effectiveBackground?.type === 'color') {
      const color = effectiveBackground.value;
      // Convert hex to RGB
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      // Calculate perceived brightness (0-255)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      // Consider dark if brightness < 128
      return brightness < 128;
    }

    return false;
  };

  const useDarkTheme = isDarkTheme();

  // Get text color for dark theme - returns inline style to override StyleContext
  const getTextColor = () => useDarkTheme ? { color: '#FFFFFF' } : {};

  // Convert background to CSS
  const getBackgroundStyle = () => {
    if (effectiveBackground.type === 'color') {
      return { backgroundColor: effectiveBackground.value };
    } else if (effectiveBackground.type === 'image') {
      return {
        backgroundImage: `url(${effectiveBackground.value})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return {};
  };

  const renderContent = () => {
    switch (type) {
      case 'title':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16 text-center">
            <H1 className="mb-8" style={getTextColor()}>{content.title}</H1>
            {content.subtitle && (
              <H2 className="font-normal" style={getTextColor()}>{content.subtitle}</H2>
            )}
          </div>
        );

      case 'text-centered':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16">
            <H2 className="mb-8 text-center">{content.heading}</H2>
            <Body size="lg" className="text-center max-w-3xl">
              {content.body}
            </Body>
          </div>
        );

      case 'quote':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16">
            <div className="border-l-4 border-accent pl-6 py-4">
              <blockquote
                className="text-2xl md:text-3xl font-medium text-primary leading-relaxed italic"
                dangerouslySetInnerHTML={{ __html: `"${content.quote}"` }}
              />
            </div>
          </div>
        );

      case 'stats-grid':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className={`grid gap-8 w-full max-w-5xl grid-cols-${content.stats.length}`}>
              {content.stats.map((stat, idx) => (
                <StatCard
                  key={idx}
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  size="medium"
                  color={stat.color || 'primary'}
                />
              ))}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className="max-w-2xl w-full">
              <ComparisonBar
                before={content.before}
                after={content.after}
                label={content.label}
                unit={content.unit || '%'}
                color={content.color || 'success'}
              />
            </div>
            {content.note && (
              <Body className="mt-8 text-center">{content.note}</Body>
            )}
          </div>
        );

      case 'two-column':
        const columns = content.columns || [content.left, content.right];
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className="grid grid-cols-2 gap-12">
              {columns.map((col, idx) => {
                const isSuccess = col.color === 'success';
                const bgClass = isSuccess ? 'bg-success/10 border-2 border-success' : 'bg-gray-100';
                return (
                  <div key={idx} className={`p-8 rounded-xl ${bgClass}`}>
                    <H3 className={`mb-6 text-center ${isSuccess ? 'text-success' : ''}`}>
                      {col.title}
                    </H3>
                    <div className="space-y-4">
                      {col.items.map((item, i) => (
                        <div key={i} className={`flex justify-between ${item.highlight ? 'font-bold text-xl' : ''}`}>
                          <span>{item.label}</span>
                          <Number className={isSuccess ? 'text-success' : ''}>{item.value}</Number>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {content.footer && (
              <Body className="mt-8 text-center text-xl font-bold">{content.footer}</Body>
            )}
          </div>
        );

      case 'big-stat':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16">
            {content.heading && <H2 className="mb-12 text-center">{content.heading}</H2>}
            <div className="text-center">
              <div className={`text-${content.size || '8xl'} font-bold text-${content.color || 'accent'} mb-8`}>
                {content.value || content.stat}
              </div>
              <Body size="lg" className="max-w-2xl">{content.description || content.body}</Body>
            </div>
          </div>
        );

      case 'list-grid':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-8">{content.heading}</H2>
            <div className={`grid gap-3 grid-cols-${content.columns || 2}`}>
              {content.items.map((item, idx) => {
                // Support both string items and object items with title/subtitle
                if (typeof item === 'string') {
                  return (
                    <div key={idx} className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                      <Body className="text-xs">{item}</Body>
                    </div>
                  );
                }
                // Handle object format with title/subtitle
                return (
                  <div key={idx} className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="mb-1 text-sm font-semibold">{item.title}</div>
                    {item.subtitle && <Body className="text-gray-600 text-xs">{item.subtitle}</Body>}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'icon-grid':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <IconGrid
              items={content.items.map(item => ({
                ...item,
                icon: getIcon(item.iconName, 48)
              }))}
              columns={content.columns || 3}
            />
          </div>
        );

      case 'number-showcase':
        return (
          <div className="flex flex-col items-center justify-center h-full p-16 text-center">
            {content.heading && <H2 className="mb-12">{content.heading}</H2>}
            <div className="text-7xl font-mono font-bold text-accent mb-4">{content.number}</div>
            <Body size="lg">{content.description}</Body>
            {content.note && (
              <div className="mt-8 bg-warning/10 p-6 rounded-xl border-2 border-warning max-w-3xl">
                <Body size="lg" className="font-bold">{content.note}</Body>
              </div>
            )}
          </div>
        );

      case 'cost-list':
        // Separate regular and highlighted items
        const regularItems = content.items.filter(item => !item.highlight);
        const highlightedItems = content.items.filter(item => item.highlight);

        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-8">{content.heading}</H2>

            {/* Regular items - use 2-column grid if there are 2 or more */}
            {regularItems.length > 0 && (
              <div className={`gap-4 mb-8 ${regularItems.length >= 2 ? 'grid grid-cols-2' : 'flex flex-col'}`}>
                {regularItems.map((item, i) => (
                  <div key={i} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                    <span className="font-semibold">{item.item || item.description}</span>
                    <span className="font-mono font-bold text-accent">{item.price || item.amount}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlighted items - always full width */}
            {highlightedItems.length > 0 && (
              <div className="space-y-4 mb-8">
                {highlightedItems.map((item, i) => (
                  <div key={i} className="flex justify-between p-6 bg-accent/10 rounded-xl border-2 border-accent">
                    <span className="font-bold text-lg">{item.item || item.description}</span>
                    <span className="font-mono font-bold text-accent text-xl">{item.price || item.amount}</span>
                  </div>
                ))}
              </div>
            )}

            {content.total && (
              <div className="bg-accent/10 p-6 rounded-xl border-2 border-accent text-center">
                <div className="text-5xl font-mono font-bold text-accent mb-2">{content.total.value || content.total.amount}</div>
                <Body className="font-bold">{content.total.label || content.total.description}</Body>
              </div>
            )}
          </div>
        );

      case 'feature-list':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
              {content.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="text-accent flex-shrink-0">{getIcon(feature.iconName, 32)}</div>
                  <div>
                    <H3 className="mb-2">{feature.title}</H3>
                    <Body>{feature.description}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="flex flex-col justify-center h-full">
            <H2 className="mb-12 text-center px-16">{content.heading}</H2>
            <div className="w-full">
              <Timeline events={content.events} />
            </div>
          </div>
        );

      case 'calculation-steps':
        return (
          <div className="flex flex-col justify-center h-full p-8">
            <H2 className="mb-8 text-center">{content.heading}</H2>
            <div className="flex items-center justify-center gap-6 flex-wrap px-4">
              {content.steps.map((step, i) => {
                // Handle operator-only steps (like × or =)
                if (step.operator) {
                  return (
                    <div key={i} className="text-5xl font-bold text-accent px-2">
                      {step.operator}
                    </div>
                  );
                }

                // Handle regular calculation steps
                return (
                  <div key={i} className={`p-6 rounded-xl ${step.highlight ? 'bg-success/10 border-2 border-success' : 'bg-gray-100'} min-w-[200px]`}>
                    {step.label && <Body className="mb-2 text-sm text-center">{step.label}</Body>}
                    <div className={`font-mono font-bold text-center ${step.highlight ? 'text-success' : 'text-primary'} text-3xl`}>
                      {step.value}
                    </div>
                    {step.description && (
                      <Body className="mt-2 text-sm text-center">{step.description}</Body>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'chart-pie':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className="w-full max-w-2xl mx-auto">
              <SimplePieChart
                data={content.data}
                height={content.height || 400}
              />
              {content.note && (
                <div className="mt-8 text-center">
                  <Body size="lg" className="font-bold" dangerouslySetInnerHTML={{ __html: content.note }} />
                </div>
              )}
            </div>
          </div>
        );

      case 'comparison-pies':
        return (
          <div className="flex flex-col justify-center h-full p-12">
            <H2 className="mb-8 text-center">{content.heading}</H2>
            <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
              {content.charts.map((chart, idx) => (
                <div key={idx} className="flex flex-col">
                  <H3 className="mb-4 text-center">{chart.title}</H3>
                  <SimplePieChart
                    data={chart.data}
                    height={300}
                  />
                  {chart.note && (
                    <Body className="mt-4 text-center font-bold text-lg">{chart.note}</Body>
                  )}
                </div>
              ))}
            </div>
            {content.footer && (
              <Body className="mt-8 text-center text-xl font-bold">{content.footer}</Body>
            )}
          </div>
        );

      case 'bell-curve':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-8 text-center">{content.heading}</H2>
            <div className="max-w-5xl mx-auto w-full">
              <BellCurve
                data={content.data}
                highlight={content.highlight}
                xLabel={content.xLabel}
                height={content.height || 400}
              />
            </div>
            {content.note && (
              <Body className="mt-6 text-center text-lg">{content.note}</Body>
            )}
          </div>
        );

      case 'bar-chart':
        return (
          <div className="flex flex-col justify-center h-full p-12">
            <H2 className="mb-6 text-center">{content.heading}</H2>
            <div className="max-w-5xl mx-auto w-full">
              <VerticalBarChart
                data={content.data}
                xLabel={content.xLabel}
                yLabel={content.yLabel}
                height={content.height || 450}
              />
            </div>
            {content.note && (
              <Body className="mt-4 text-center text-lg">{content.note}</Body>
            )}
          </div>
        );

      case 'numbered-grid':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className={`grid gap-8 max-w-4xl mx-auto grid-cols-${content.columns || 2}`}>
              {content.items.map((item, i) => (
                <div key={i} className="bg-accent/5 p-8 rounded-xl border-2 border-accent">
                  <div className="text-5xl font-bold text-accent mb-4">{item.number}</div>
                  <Body size="lg">{item.text}</Body>
                </div>
              ))}
            </div>
          </div>
        );

      case 'quote-with-grid':
        const gridData = content.grid || content;
        const gridItems = gridData.items || [];
        const gridColumns = gridData.columns || 2;
        return (
          <div className="flex flex-col items-center justify-center h-full p-16">
            <div className="border-l-4 border-accent pl-6 py-4 mb-12">
              <blockquote className="text-2xl md:text-3xl font-medium text-primary leading-relaxed italic">
                "{content.quote}"
              </blockquote>
            </div>
            <div className={`grid gap-8 w-full max-w-4xl grid-cols-${gridColumns}`}>
              {gridItems.map((item, i) => (
                <div key={i} className="bg-gray-100 p-8 rounded-xl text-center">
                  <div className="text-6xl mb-4">{item.emoji || item.icon}</div>
                  <Body className="font-bold">{item.label || item.text}</Body>
                </div>
              ))}
            </div>
          </div>
        );

      case 'number-grid':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-8">{content.heading}</H2>
            <div className={`grid gap-8 text-center grid-cols-${content.numbers.length}`}>
              {content.numbers.map((num, i) => (
                <div key={i}>
                  <div className="text-5xl font-mono font-bold text-primary mb-4">{num.value}</div>
                  <Body>{num.label}</Body>
                </div>
              ))}
            </div>
          </div>
        );

      case 'multi-section':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12 text-center">{content.heading}</H2>
            <div className="max-w-4xl mx-auto space-y-8">
              {content.sections.map((section, i) => {
                // Handle section with just content (stat/description)
                if (section.content) {
                  return (
                    <div key={i} className={`p-8 rounded-xl text-center ${section.highlight ? 'bg-accent/10 border-2 border-accent' : 'bg-primary/5'}`}>
                      {section.content.stat && (
                        <div className="text-4xl font-bold text-accent mb-4">{section.content.stat}</div>
                      )}
                      {section.content.description && (
                        <Body size="lg">{section.content.description}</Body>
                      )}
                    </div>
                  );
                }

                // Handle section with grid type
                if (section.type === 'grid') {
                  return (
                    <div key={i} className="grid grid-cols-3 gap-4">
                      {section.items.map((item, j) => (
                        <div key={j} className="bg-gray-100 p-6 rounded-xl text-center">
                          <div className="font-bold text-lg mb-1">{item.label}</div>
                          {item.sublabel && <div className="text-sm text-gray-600">{item.sublabel}</div>}
                        </div>
                      ))}
                    </div>
                  );
                }

                // Handle regular section
                return (
                  <div key={i} className={`p-8 rounded-xl ${section.highlight ? 'bg-success/10 border-2 border-success' : 'bg-primary/5'}`}>
                    {section.title && <H3 className="mb-4">{section.title}</H3>}
                    {section.body && <Body className="mb-4">{section.body}</Body>}
                    {section.description && <Body className="mb-4">{section.description}</Body>}
                    {section.text && <Body className="text-lg">{section.text}</Body>}
                    {section.items && (
                      <ul className="space-y-2">
                        {section.items.map((item, j) => {
                          // Handle string items
                          if (typeof item === 'string') {
                            return (
                              <li key={j} className="flex items-start gap-3">
                                {section.checkmarks && <span className="text-success">✓</span>}
                                <Body>{item}</Body>
                              </li>
                            );
                          }
                          // Handle object items with label/sublabel
                          return (
                            <li key={j} className="flex items-start gap-3">
                              {section.checkmarks && <span className="text-success">✓</span>}
                              <Body>
                                {item.label}
                                {item.sublabel && <span className="text-sm text-gray-600"> - {item.sublabel}</span>}
                              </Body>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    {section.timeline && (
                      <div className="grid grid-cols-4 gap-2 text-sm mt-4">
                        {section.timeline.map((t, j) => (
                          <div key={j} className="bg-white p-3 rounded">{t}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {content.footer && (
              <Body className="mt-8 text-center text-xl font-bold">{content.footer}</Body>
            )}
          </div>
        );

      case 'cost-sections':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <H2 className="mb-12">{content.heading}</H2>
            <div className="space-y-8">
              {content.sections.map((section, i) => (
                <div key={i} className="bg-gray-100 p-8 rounded-xl">
                  <div className="text-5xl font-mono font-bold text-accent mb-2">{section.value}</div>
                  <Body>{section.description}</Body>
                </div>
              ))}
              {content.total && (
                <div className={`p-8 rounded-xl ${content.total.highlight ? 'bg-accent/10 border-2 border-accent' : 'bg-gray-100'}`}>
                  <div className="text-6xl font-mono font-bold text-accent mb-2">{content.total.value}</div>
                  <Body className="font-bold">{content.total.description}</Body>
                </div>
              )}
            </div>
          </div>
        );

      case 'image-text':
        return (
          <div className="flex items-center justify-center h-full p-16">
            <div className="grid grid-cols-2 gap-12 max-w-6xl w-full">
              {/* Image placeholder */}
              <div className="flex items-center justify-center bg-gray-200 rounded-xl aspect-[3/4] border-2 border-dashed border-gray-400">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🖼️</div>
                  <div className="text-lg font-semibold">Image Placeholder</div>
                  <div className="text-sm mt-2">{content.imagePlaceholder || 'Add your image here'}</div>
                </div>
              </div>

              {/* Text content - left aligned */}
              <div className="flex flex-col justify-center text-left">
                {content.heading && <H2 className="mb-6">{content.heading}</H2>}
                {content.body && <Body size="lg" className="leading-relaxed">{content.body}</Body>}
                {content.bullets && (
                  <ul className="mt-6 space-y-3">
                    {content.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-accent mt-1">•</span>
                        <Body>{bullet}</Body>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );

      case 'custom-html':
        return (
          <div className="flex flex-col justify-center h-full p-16">
            <div dangerouslySetInnerHTML={{ __html: content.html }} />
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full p-16">
            <Body>Unknown slide type: {type}</Body>
          </div>
        );
    }
  };

  return (
    <div
      className={`w-full h-full ${useDarkTheme ? 'text-white' : 'text-gray-900'}`}
      style={getBackgroundStyle()}
    >
      {renderContent()}
    </div>
  );
};

export default SlideRenderer;
