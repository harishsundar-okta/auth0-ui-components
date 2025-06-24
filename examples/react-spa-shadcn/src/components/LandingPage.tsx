import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Smartphone, Key } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Multi-Factor Authentication',
      description:
        'Advanced security with multiple authentication methods including TOTP, SMS, and hardware keys.',
    },
    {
      icon: Lock,
      title: 'Secure by Design',
      description:
        'Built with security best practices and modern encryption standards to protect your users.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Responsive design that works seamlessly across all devices and platforms.',
    },
    {
      icon: Key,
      title: 'Easy Integration',
      description:
        'Simple API and well-documented components for quick integration into your applications.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure Authentication
              <span className="block text-blue-600">Components</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Beautiful, secure, and customizable authentication components built with React,
              TypeScript, and Shadcn UI. Perfect for modern web applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                <Link to="/accounts">View Demo</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Components?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive security features designed for modern applications with user experience
              in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Secure Your Application?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Try our MFA components in action and see how easy it is to add enterprise-grade security
            to your app.
          </p>
          <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            <Link to="/accounts">Explore Demo</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
