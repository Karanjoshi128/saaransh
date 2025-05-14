import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingFeatureProps {
  children: React.ReactNode;
  included?: boolean;
}

const PricingFeature = ({ children, included = true }: PricingFeatureProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "rounded-full p-1",
          included ? "text-primary" : "text-muted-foreground/50"
        )}
      >
        <Check size={16} />
      </div>
      <span
        className={cn(
          "text-sm",
          included ? "text-foreground" : "text-muted-foreground/50"
        )}
      >
        {children}
      </span>
    </div>
  );
};

const PricingSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that is right for you and start summarizing PDFs
            today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="border rounded-xl p-8 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Basic</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    $9
                  </span>
                  <span className="ml-1 text-lg text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Perfect for occasional users who need basic PDF summaries.
                </p>
              </div>

              <div className="mt-6 space-y-3 flex-1">
                <PricingFeature>5 PDF summaries per month</PricingFeature>
                <PricingFeature>Standard processing time</PricingFeature>
                <PricingFeature>Email support</PricingFeature>
                <PricingFeature included={false}>
                  Unlimited PDF summaries
                </PricingFeature>
                <PricingFeature included={false}>
                  Priority processing
                </PricingFeature>
                <PricingFeature included={false}>
                  24/7 Priority support
                </PricingFeature>
                <PricingFeature included={false}>
                  Markdown export
                </PricingFeature>
              </div>

              <Button className="mt-8 w-full" variant="outline">
                Get Started
              </Button>
            </div>
          </div>

          {/* Pro Plan - Highlighted */}
          <div className="border-2 border-primary rounded-xl p-8 shadow-md relative bg-gradient-to-b from-background to-primary/5 transition-all duration-200 hover:shadow-lg">
            <div className="absolute -top-3 right-4">
              <Badge variant="default" className="px-3 py-1">
                <Star className="h-3.5 w-3.5 mr-1" /> RECOMMENDED
              </Badge>
            </div>
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Pro</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight text-primary">
                    $19
                  </span>
                  <span className="ml-1 text-lg text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="mt-4 text-muted-foreground">
                  For power users who need unlimited summaries and premium
                  features.
                </p>
              </div>

              <div className="mt-6 space-y-3 flex-1">
                <PricingFeature>
                  <span className="font-medium text-primary">Unlimited</span>{" "}
                  PDF summaries
                </PricingFeature>
                <PricingFeature>
                  <span className="font-medium text-primary">Priority</span>{" "}
                  processing
                </PricingFeature>
                <PricingFeature>24/7 Priority support</PricingFeature>
                <PricingFeature>Markdown export</PricingFeature>
                <PricingFeature>All Basic features</PricingFeature>
              </div>

              <Button className="mt-8 w-full" variant="default">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All plans come with a 14-day money-back guarantee. No questions
            asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
