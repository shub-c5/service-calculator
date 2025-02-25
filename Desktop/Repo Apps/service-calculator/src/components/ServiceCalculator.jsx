import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, ChevronUp } from 'lucide-react';

const ServiceCalculator = () => {
  const [selectedService, setSelectedService] = React.useState("");
  const [timeline, setTimeline] = React.useState(4);
  const [selectedAddons, setSelectedAddons] = React.useState([]);
  const [isAddonsOpen, setIsAddonsOpen] = React.useState(false);

  const BASE_COST = 500000;
  const ADDON_COST = 100000;
  const BASE_WEEKS = 4;
  const WEEKS_PER_ADDON = 2;
  const EXTRA_WEEKS_RANGE = 12;

  const services = {
    industrial: {
      name: "Industrial Design",
      addons: [
        "Surfacing",
        "CAD Modeling",
        "Prototyping",
        "Manufacturing Assistance",
        "Material Consultation",
        "Design Documentation"
      ]
    },
    brand: {
      name: "Brand Design",
      addons: [
        "Brand Guidelines",
        "Social Media Kit",
        "Marketing Collateral",
        "Merchandise Design",
        "Brand Strategy",
        "Brand Voice"
      ]
    },
    uiux: {
      name: "UI/UX Design",
      addons: [
        "User Research",
        "Wireframing",
        "Prototype",
        "User Testing",
        "Design System",
        "Documentation"
      ]
    },
    website: {
      name: "Website Design",
      addons: [
        "SEO Optimization",
        "Content Strategy",
        "Animation",
        "CMS Integration",
        "Analytics Setup",
        "Performance Optimization"
      ]
    },
    impact: {
      name: "Impact Design",
      addons: [
        "Impact Assessment",
        "Stakeholder Mapping",
        "Sustainability Analysis",
        "Community Engagement",
        "Impact Metrics",
        "Implementation Strategy"
      ]
    }
  };

  const baseTimeline = React.useMemo(() => {
    return BASE_WEEKS + (selectedAddons.length * WEEKS_PER_ADDON);
  }, [selectedAddons.length]);

  const maxTimeline = React.useMemo(() => {
    return baseTimeline + EXTRA_WEEKS_RANGE;
  }, [baseTimeline]);

  React.useEffect(() => {
    if (timeline > maxTimeline) {
      setTimeline(maxTimeline);
    }
  }, [maxTimeline, timeline]);

  const calculateTimelineMultiplier = (weeks) => {
    const difference = weeks - baseTimeline;
    
    if (difference < 0) {
      const rushPercentage = (-difference / (baseTimeline - 1)) * 100;
      const maxRushPercentage = 100;
      const actualRushPercentage = Math.min(rushPercentage, maxRushPercentage);
      const addonPenalty = 1 + (selectedAddons.length * 0.1);
      return (1 + (actualRushPercentage / 100)) * addonPenalty;
    } else if (difference > 0) {
      const discountFactor = 1 - (Math.log(difference + 1) / 10);
      return Math.max(discountFactor, 0.4);
    }
    return 1;
  };

  const calculateCost = () => {
    if (!selectedService) return 0;
    const baseWithAddons = BASE_COST + (selectedAddons.length * ADDON_COST);
    const timelineMultiplier = calculateTimelineMultiplier(timeline);
    return Math.round(baseWithAddons * timelineMultiplier);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTimelineLabel = () => {
    const multiplier = calculateTimelineMultiplier(timeline);
    const percentage = ((multiplier - 1) * 100).toFixed(0);
    
    if (timeline < baseTimeline) {
      return `Rush: +${percentage}%`;
    } else if (timeline > baseTimeline) {
      return `Relaxed: -${((1 - multiplier) * 100).toFixed(0)}%`;
    }
    return "Standard Timeline";
  };

  return (
    <div className="p-8 min-h-screen bg-neutral-50">
      <Card className="w-full max-w-4xl mx-auto mt-8 bg-white border-0 shadow-xl overflow-hidden">
        <CardHeader className="px-8 py-8 border-b bg-gray-100">
          <CardTitle className="text-3xl font-medium mb-2">Project Cost Calculator</CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Calculate an estimate for your design project based on your requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-12 space-y-8">
          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
            <label className="text-xl font-medium block mb-3">Select Service</label>
            <Select value={selectedService} onValueChange={(value) => {
              setSelectedService(value);
              setSelectedAddons([]);
              setTimeline(BASE_WEEKS);
            }}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(services).map(([key, service]) => (
                  <SelectItem key={key} value={key}>{service.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedService && (
            <>
              <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <button
                  onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                  className="w-full px-6 py-4 hover:bg-gray-100/50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">Additional Services</h3>
                    <span className="text-gray-500 hover:text-gray-700">
                      {isAddonsOpen ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </span>
                  </div>
                </button>
                
                {isAddonsOpen && (
                  <div className="bg-gray-50/50 rounded-lg mt-4 px-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {services[selectedService].addons.map((addon) => (
                        <div key={addon} className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-50">
                          <Checkbox
                            id={addon}
                            checked={selectedAddons.includes(addon)}
                            onCheckedChange={(checked) => {
                              const newAddons = checked
                                ? [...selectedAddons, addon]
                                : selectedAddons.filter(a => a !== addon);
                              setSelectedAddons(newAddons);
                              const newBaseTimeline = BASE_WEEKS + (newAddons.length * WEEKS_PER_ADDON);
                              setTimeline(newBaseTimeline);
                            }}
                          />
                          <label htmlFor={addon} className="text-base text-gray-700 cursor-pointer select-none">
                            {addon} <span className="text-gray-500">(+2 weeks)</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 rounded-xl border border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-xl font-medium">Project Timeline</label>
                  <button
                    onClick={() => setTimeline(baseTimeline)}
                    className="px-4 py-2 text-sm bg-white border rounded-lg text-rose-600 border-rose-600 hover:bg-rose-600 hover:text-white transition-colors duration-200"
                  >
                    Reset to Standard Timeline
                  </button>
                </div>
                <div className="bg-gray-50/50 rounded-lg p-4">
                  <Slider
                    value={[timeline]}
                    onValueChange={(value) => setTimeline(value[0])}
                    min={1}
                    max={maxTimeline}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-4">
                    <span className="text-base text-gray-500">Rush</span>
                    <span className="text-base font-medium">{timeline} weeks</span>
                    <span className="text-base text-gray-500">Relaxed (+{EXTRA_WEEKS_RANGE} weeks)</span>
                  </div>
                  <div className="mt-6 p-3 bg-gray-100 rounded-lg text-center">
                    <span className="text-base font-medium text-gray-600">
                      {timeline === baseTimeline ? "Standard Timeline" : getTimelineLabel()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-xl border border-gray-200 bg-gray-50">
                <h3 className="text-xl font-medium mb-4">Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Base Cost:</span>
                    <span className="text-gray-900 font-medium">{formatCurrency(BASE_COST)}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Additional Services ({selectedAddons.length}):</span>
                      <span className="text-gray-900 font-medium">{formatCurrency(selectedAddons.length * ADDON_COST)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Timeline Adjustment:</span>
                    <span className="text-gray-900 font-medium">{getTimelineLabel()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Estimated Total:</span>
                      <span className="text-rose-600">{formatCurrency(calculateCost())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceCalculator;