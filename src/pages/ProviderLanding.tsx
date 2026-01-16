import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Store, Smartphone, CheckCircle, Eye, Settings, Sparkles, MapPin, Image, FileText, User } from "lucide-react";
import benefitplusLogo from "@/assets/benefitplus-logo.svg";

const ProviderLanding = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    contact: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo request submitted:", formData);
    alert("Thank you! We'll be in touch soon.");
    setFormData({ name: "", businessName: "", contact: "" });
  };

  const whatsappLink = "https://wa.me/35699695920";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <img src={benefitplusLogo} alt="Benefitplus" className="h-8 w-auto" />
            <span className="text-xs text-muted-foreground mt-1">Smart savings, close to you</span>
          </div>
          <Button asChild size="sm" className="gap-2">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              Contact Us
            </a>
          </Button>
        </div>
      </header>

      {/* Malta Launch Note */}
      <div className="bg-primary/5 py-2 text-center">
        <p className="text-sm text-muted-foreground">Launching in Malta. Gozo coming soon.</p>
      </div>

      {/* What is Benefitplus? */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              What is Benefitplus?
            </h1>
            <p className="text-muted-foreground leading-relaxed text-center">
              Benefitplus is a local discount discovery app. Users browse offers nearby and redeem them in-store using a secure, rotating code. There are no contracts, no commitments—just a simple way to attract more customers to your business.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Steps */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-10">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Store className="h-7 w-7 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 1</div>
                <h3 className="text-base font-semibold text-foreground">You choose the discount</h3>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-7 w-7 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 2</div>
                <h3 className="text-base font-semibold text-foreground">We list you in the app</h3>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-7 w-7 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step 3</div>
                <h3 className="text-base font-semibold text-foreground">Customers redeem with a rotating code</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Demo - Mockups */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-10">
              See It In Action
            </h2>
            <div className="flex justify-center gap-4 md:gap-6 overflow-x-auto pb-4">
              {/* Phone Mockup 1 - Browse */}
              <div className="flex-shrink-0 w-44 md:w-52">
                <div className="bg-foreground rounded-3xl p-2 shadow-lg">
                  <div className="bg-background rounded-2xl overflow-hidden aspect-[9/16]">
                    <div className="p-3 space-y-3">
                      <div className="h-7 bg-muted rounded-lg flex items-center px-3">
                        <span className="text-xs text-muted-foreground">Search...</span>
                      </div>
                      <div className="flex gap-2 overflow-hidden">
                        {["Food", "Fitness", "Beauty"].map((cat) => (
                          <div key={cat} className="px-2 py-1 bg-primary/10 rounded-full text-xs text-primary whitespace-nowrap">
                            {cat}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="bg-muted rounded-lg p-2">
                          <div className="h-12 bg-primary/20 rounded mb-2" />
                          <div className="h-2 bg-muted-foreground/20 rounded w-3/4 mb-1" />
                          <div className="h-2 bg-muted-foreground/10 rounded w-1/2" />
                        </div>
                        <div className="bg-muted rounded-lg p-2">
                          <div className="h-12 bg-primary/20 rounded mb-2" />
                          <div className="h-2 bg-muted-foreground/20 rounded w-3/4 mb-1" />
                          <div className="h-2 bg-muted-foreground/10 rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3">Users browse nearby offers</p>
              </div>
              {/* Phone Mockup 2 - Details */}
              <div className="flex-shrink-0 w-44 md:w-52">
                <div className="bg-foreground rounded-3xl p-2 shadow-lg">
                  <div className="bg-background rounded-2xl overflow-hidden aspect-[9/16]">
                    <div className="p-3 space-y-3">
                      <div className="h-20 bg-primary/20 rounded-lg" />
                      <div className="space-y-2">
                        <div className="h-3 bg-foreground/80 rounded w-2/3" />
                        <div className="h-2 bg-muted-foreground/30 rounded w-full" />
                        <div className="h-2 bg-muted-foreground/30 rounded w-3/4" />
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20" />
                        <div className="h-2 bg-muted-foreground/30 rounded flex-1" />
                      </div>
                      <Button size="sm" className="w-full mt-4 text-xs">
                        Redeem
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3">Clear offer details</p>
              </div>
              {/* Phone Mockup 3 - Code */}
              <div className="flex-shrink-0 w-44 md:w-52">
                <div className="bg-foreground rounded-3xl p-2 shadow-lg">
                  <div className="bg-background rounded-2xl overflow-hidden aspect-[9/16]">
                    <div className="p-3 flex flex-col items-center justify-center h-full space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground tracking-widest">847291</div>
                        <div className="text-xs text-muted-foreground mt-1">Show to staff</div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full w-3/4" />
                      </div>
                      <div className="text-xs text-muted-foreground">45s remaining</div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-3">Simple rotating code redemption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get / What We Need */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* What You Get */}
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-5">What You Get</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Local visibility</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Settings className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Offer control</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Free during launch</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              {/* What We Need */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-5">What We Need</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Image className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Logo</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Offer details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Location</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Contact person</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-10">
              Get Started
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* WhatsApp CTA */}
              <div className="flex flex-col items-center text-center">
                <Button asChild size="lg" className="w-full gap-2">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
                <p className="text-sm text-muted-foreground mt-3">Quick response, no forms</p>
              </div>
              {/* Form CTA */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold text-foreground mb-4 text-center">Request a Demo</h3>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Business name"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Phone or Email"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      required
                    />
                    <Button type="submit" variant="outline" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Submit
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <img src={benefitplusLogo} alt="Benefitplus" className="h-6 w-auto mx-auto" />
        </div>
      </footer>
    </div>
  );
};

export default ProviderLanding;
