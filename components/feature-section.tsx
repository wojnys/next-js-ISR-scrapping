import { Layers, Zap, Shield, RefreshCw } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FeatureSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything you need for web success
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our web products come with powerful features designed to help you build, grow, and succeed online.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-8">
          <Card>
            <CardHeader className="pb-2">
              <Layers className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Modular Design</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Flexible components that can be combined in various ways to create unique layouts.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Zap className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optimized for speed and efficiency, ensuring your website loads quickly and runs smoothly.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Built with security best practices to protect your data and your users.</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              <CardTitle className="mt-2">Regular Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Continuous improvements and new features to keep your web products up-to-date.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
