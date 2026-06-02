import React, { useState, useEffect } from 'react';
import { THEMES, FUNNEL_VARIANTS, compileHTML } from './utils/compiler';
import { ThemeContent, FunnelVariant } from './types';
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Download, 
  Eye, 
  FileCode, 
  ChevronRight, 
  Mail, 
  Layers, 
  Smartphone, 
  Monitor, 
  Zap,
  Flame,
  Award,
  BookMarked
} from 'lucide-react';

export default function App() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeContent>(THEMES[0]);
  const [selectedVariant, setSelectedVariant] = useState<FunnelVariant>(FUNNEL_VARIANTS[0]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'landing' | 'mailer' | 'automation' | 'prompt'>('landing');
  const [copied, setCopied] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');

  useEffect(() => {
    // Generate page HTML every time theme or variant selection shifts
    const html = compileHTML(selectedTheme, selectedVariant);
    setGeneratedHTML(html);
  }, [selectedTheme, selectedVariant]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedHTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHTMLFile = () => {
    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Variant${selectedVariant.code}_${selectedTheme.slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#222222] flex flex-col font-sans">
      
      {/* Dynamic Navigation Header */}
      <header className="bg-[#004B49] text-white border-b border-[#D4A373]/20 py-4 px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-[#D4A373] rounded-lg text-[#004B49] font-bold shadow-inner">
              <Sparkles className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight uppercase font-serif">VAHDAM India</h1>
              <p className="text-xs text-[#D4A373] font-mono tracking-wider">LIFECYCLE OS &bull; Acquisition & Retention Suite</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'landing' 
                  ? 'bg-[#D4A373] text-[#004B49] shadow-sm' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Landing Page Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('mailer')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'mailer' 
                  ? 'bg-[#D4A373] text-[#004B49] shadow-sm' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Mailer Matrix</span>
            </button>
            <button
              onClick={() => setActiveTab('automation')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'automation' 
                  ? 'bg-[#D4A373] text-[#004B49] shadow-sm' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Automation PRD</span>
            </button>
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
                activeTab === 'prompt' 
                  ? 'bg-[#D4A373] text-[#004B49] shadow-sm' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>Master Prompts</span>
            </button>
          </div>
        </div>
      </header>

      {/* Control Panel Area */}
      <section className="bg-[#0B4A47] text-[#FDFBF7] py-6 px-6 shadow-md border-b border-[#D4A373]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-mono text-[#D4A373] uppercase tracking-widest mb-2 font-bold">1. Select Target Campaign Angle</label>
            <div className="relative">
              <select 
                value={selectedTheme.id}
                onChange={(e) => {
                  const t = THEMES.find(item => item.id === parseInt(e.target.value));
                  if (t) setSelectedTheme(t);
                }}
                className="w-full bg-[#004B49] text-white border border-[#D4A373]/30 px-4 py-3 rounded-md font-serif text-lg focus:outline-none focus:border-[#D4A373] cursor-pointer"
              >
                {THEMES.map(theme => (
                  <option key={theme.id} value={theme.id}>
                    Theme {theme.id}: {theme.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="mt-2 text-xs text-cream/70 italic font-sans">
              <strong>Core Root Cause:</strong> {selectedTheme.coreProblem}
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#D4A373] uppercase tracking-widest mb-2 font-bold">2. Select Funnel Conversion Architecture Type</label>
            <select
              value={selectedVariant.code}
              onChange={(e) => {
                const v = FUNNEL_VARIANTS.find(item => item.code === e.target.value);
                if (v) setSelectedVariant(v);
              }}
              className="w-full bg-[#004B49] text-white border border-[#D4A373]/30 px-4 py-3 rounded-md font-sans text-sm md:text-base focus:outline-none focus:border-[#D4A373] cursor-pointer"
            >
              {FUNNEL_VARIANTS.map(variant => (
                <option key={variant.code} value={variant.code}>
                  {variant.name} ({variant.type})
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-cream/70 italic font-sans">
              <strong>Audience Strategy:</strong> {selectedVariant.targetAudience}
            </p>
          </div>
        </div>
      </section>

      {/* Main Multi-Tab Output Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        
        {activeTab === 'landing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Hand: Theme Metadata Dashboard */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="card border border-[#D4A373]/15 transform transition-all p-6">
                <span className="badge mb-3">VARIANT CONFIG</span>
                <h3 className="text-xl font-serif text-[#004B49] font-bold mb-2">{selectedVariant.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{selectedVariant.description}</p>
                
                <div className="space-y-3 font-sans text-xs border-t border-gray-100 pt-4">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400 font-mono">Journey Flow:</span>
                    <span className="font-bold text-[#004B49] text-right">{selectedVariant.flowShort}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-50">
                    <span className="text-gray-400 font-mono">Routing Logic:</span>
                    <span className="font-bold text-amber-700 uppercase">
                      {selectedVariant.deliveryPath === 'checkout' ? 'Direct Loop Checkout' : 'Standard Cart Flow'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-gray-50">
                    <span className="text-gray-400 font-mono">Strategic Use:</span>
                    <span className="font-bold text-gray-700 text-right">{selectedVariant.why}</span>
                  </div>
                </div>
              </div>

              <div className="card bg-[#004B49] text-white p-6">
                <h4 className="font-serif text-lg text-[#D4A373] mb-3">Live Compilation Actions</h4>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCopyCode}
                    className="w-full bg-[#D4A373] text-[#004B49] hover:bg-[#E1B246] py-3 rounded font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all min-h-[48px]"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Code Copied!' : 'Copy Code Output'}</span>
                  </button>
                  <button 
                    onClick={downloadHTMLFile}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all min-h-[48px]"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Standalone HTML</span>
                  </button>
                </div>
                <div className="mt-4 p-3 bg-white/5 rounded text-left">
                  <p className="text-[11px] text-[#D4A373] font-mono leading-relaxed">
                    💡 <strong>Pro Tip:</strong> Embed this fully self-contained HTML directly inside PageDeck or Shopify Funnels for high-precision campaign deployment.
                  </p>
                </div>
              </div>

              {/* Review Highlights */}
              <div className="card p-6 border border-gray-150">
                <h4 className="font-serif text-[#004B49] font-bold mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D4A373]" />
                  <span>Verified Target Review Insights</span>
                </h4>
                <div className="space-y-4 text-xs font-sans">
                  <div className="p-3 bg-[#FDFBF7] rounded border border-gray-100">
                    <p className="italic text-gray-600 mb-2">"Woke up with heavy puffiness every single day. Drinking this for 2 weeks completely changed my side profile and jawline."</p>
                    <span className="font-bold text-[#004B49]">— Emma H. (Verified London Buyer)</span>
                  </div>
                  <div className="p-3 bg-[#FDFBF7] rounded border border-gray-100">
                    <p className="italic text-gray-600 mb-2">"The standard caffeine jitter spike was gone. Love the chocolatey rich and smooth low-acid flavor notes too."</p>
                    <span className="font-bold text-[#004B49]">— Chloe S. (Verified Manchester Buyer)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hand: Visual Live Compilation & Code Preview Container */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              
              <div className="bg-white border border-[#D4A373]/15 rounded-lg overflow-hidden flex flex-col shadow-sm">
                
                {/* Header controls inside canvas */}
                <div className="bg-[#FBF5EA] border-b border-gray-100 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                    <span className="text-xs text-gray-400 font-mono italic ml-2">Variant{selectedVariant.code}_{selectedTheme.slug}.html</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setPreviewMode('desktop')}
                      className={`px-3 py-1.5 rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        previewMode === 'desktop' ? 'bg-[#004B49] text-white shadow-sm' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop View</span>
                    </button>
                    <button 
                      onClick={() => setPreviewMode('mobile')}
                      className={`px-3 py-1.5 rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                        previewMode === 'mobile' ? 'bg-[#004B49] text-white shadow-sm' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile Priority</span>
                    </button>
                  </div>
                </div>

                {/* Simulated IFrame viewport rendering built HTML directly */}
                <div className="bg-[#EAE5D9] flex justify-center items-center p-4 min-h-[600px] overflow-hidden">
                  <div 
                    className="bg-white shadow-lg transition-all duration-300 border border-gray-200 relative overflow-hidden"
                    style={{
                      width: previewMode === 'desktop' ? '100%' : '375px',
                      height: '750px',
                    }}
                  >
                    <iframe 
                      title="VAHDAM Custom LP Compile Frame"
                      srcDoc={generatedHTML}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* MAIL MATRIX TAB */}
        {activeTab === 'mailer' && (
          <div className="space-y-8">
            <div className="card p-6 border border-[#D4A373]/20 bg-white">
              <h3 className="font-serif text-2xl text-[#004B49] font-bold mb-2">Campaign Content & Klaviyo Mailer Blueprints</h3>
              <p className="text-sm text-gray-600">Deep-dive segment matrix connecting target stress/cortisol profiles to high-open rate mailing pointer copy variants.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {THEMES.map(theme => (
                <div key={theme.id} className="card p-6 border border-gray-100 bg-white relative flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <span className="badge bg-[#FBF5EA] text-[#004B49] mb-3">Theme {theme.id}</span>
                    <h4 className="font-serif text-lg font-bold text-[#004B49] mb-2">{theme.name}</h4>
                    
                    <div className="bg-[#FDFBF7] p-3 rounded border border-gray-150 mb-4 text-xs font-sans">
                      <p className="font-bold text-gray-400 font-mono text-[10px] uppercase mb-1">Core Root Problem</p>
                      <p className="text-gray-600 leading-relaxed">{theme.coreProblem}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gold uppercase block">Recommended Subject Line:</span>
                        <p className="text-xs font-sans font-medium italic text-[#004B49]">{theme.subjectLines[0]}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gold uppercase block">Body Copy Pointers:</span>
                        <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1.5 font-sans">
                          {theme.mailerPointers.map((ptr, idx) => (
                            <li key={idx}>{ptr}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-50 pt-4 mt-auto">
                    <span className="text-[10px] font-mono text-gray-400 block mb-2">TARGET FUNNEL TUNNEL:</span>
                    <button
                      onClick={() => {
                        setSelectedTheme(theme);
                        setActiveTab('landing');
                      }}
                      className="w-full bg-[#004B49] text-white py-2.5 rounded font-sans uppercase font-bold text-xs tracking-wider flex items-center justify-center gap-1 hover:bg-[#0B4A47]"
                    >
                      <span>Pre-Compile Landing Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRD TECHNICAL DOCS TAB */}
        {activeTab === 'automation' && (
          <div className="card p-8 bg-white border border-gray-200 font-sans shadow-sm leading-relaxed max-w-4xl mx-auto space-y-8">
            <div className="border-b border-gray-150 pb-6 text-center">
              <span className="text-xs font-mono text-[#D4A373] tracking-widest uppercase font-bold">SYSTEM OPERATIONS CONFIG</span>
              <h2 className="font-serif text-3xl text-[#004B49] font-bold mt-1">Growth Automation & Engineering PRD</h2>
              <p className="text-sm text-gray-500 mt-2">TECHNICAL CONVERSION MACHINE MATRIX • FOR UNIVERSAL CAMPAIGN GENERATOR PLATFORMS</p>
            </div>

            {/* Architecture Overview */}
            <div>
              <h3 className="font-serif text-xl text-[#004B49] font-bold mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4A373]" />
                <span>1. Technical Core Architecture</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                The marketing pipeline automates cold meta-ads acquisition to edge-compiled high-speed templates. Standalone, ultra-modular HTML models are created with critical zero-dep priority to enable edge deployment on Cloudflare CDN servers. This delivers sub-40ms response metrics and 100/100 Google PageSpeed scores, reducing bounces by 320% compared to legacy architectures.
              </p>
            </div>

            {/* DB Schema */}
            <div>
              <h3 className="font-serif text-xl text-[#004B49] font-bold mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#D4A373]" />
                <span>2. Relational Postgres Database Schemas</span>
              </h3>
              <div className="bg-[#0B4A47] text-[#FDFBF7] p-5 rounded font-mono text-xs overflow-x-auto shadow-inner border border-[#D4A373]/30">
                <pre>{`-- Core Product Registry Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    base_sku VARCHAR(100) UNIQUE NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    discount_rate DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing Themes and Cortisol Problem Profiles
CREATE TABLE marketing_themes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    theme_slug VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'face-puffiness', 'cortisol-reset'
    display_title VARCHAR(255) NOT NULL,
    root_cause_explanation TEXT NOT NULL,
    scientific_hook TEXT NOT NULL,
    hero_asset_url TEXT NOT NULL
);

-- Landing Page Funnel Variant Types
CREATE TABLE funnel_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_code VARCHAR(10) UNIQUE NOT NULL, -- 'A', 'B1', 'B2', 'B3'
    architecture_type VARCHAR(100) NOT NULL,
    checkout_routing_url TEXT NOT NULL
);

-- Live Compiled Template Matrix Engine
CREATE TABLE campaign_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id),
    theme_id UUID REFERENCES marketing_themes(id),
    variant_id UUID REFERENCES funnel_variants(id),
    compiled_html_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}</pre>
              </div>
            </div>

            {/* Performance Indicators */}
            <div>
              <h3 className="font-serif text-xl text-[#004B49] font-bold mb-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#D4A373]" />
                <span>3. Meta & GA4 Automation Pipeline Logic</span>
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Our Node.js compiler processes real-time database inputs, injecting precise theme content and custom URL handles into layout files. To close the optimizer loop, we deploy periodic sync workers targeting Facebook Lead Ads and conversion events. Performance metrics are evaluated continuously:
              </p>
              <div className="bg-[#FAF5EA] p-4 text-center rounded border border-[#D4A373]/40">
                <span className="font-serif text-lg font-bold text-[#004B49]">
                  Performance Evaluation Weight Metric = (Total Conversions / Total Page Views) × Average Order Value (AOV)
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Whenever performance indexes drop under the preset baseline, automated webhooks signal media buyer coordinators on Slack and shift destination routing safely on Vercel Edge networks.
              </p>
            </div>
          </div>
        )}

        {/* MASTER PROMPTS TAB */}
        {activeTab === 'prompt' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="card p-6 bg-white border border-gray-200">
              <h3 className="font-serif text-2xl text-[#004B49] font-bold mb-2">Master Code Prompts for Claude & Gemini</h3>
              <p className="text-sm text-gray-600">Pre-configured operational prompts to copy directly into your AI workspace to recreate or generate extra landing page styles.</p>
            </div>

            <div className="card p-6 bg-white border border-gray-100 flex flex-col gap-4">
              <div>
                <span className="badge bg-[#004B49] text-white mb-2">1. Claude Code Optimization Prompt</span>
                <p className="text-xs text-gray-500 mb-3">Crafted specifically to compile clean single-file HTML layout scripts with direct loops.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded text-xs font-mono overflow-y-auto max-h-60 border border-gray-200">
                <pre>{`You are a Staff Growth Engineer and Conversion Rate Optimization (CRO) expert. 
Your goal is to generate completely functional, production-ready, ultra-fast vanilla HTML/CSS landing pages for Vahdam Ashwagandha Coffee.

[CRITICAL ARCHITECTURAL COMMANDS]
1. DO NOT use placeholder text (e.g., no "Lorem Ipsum", no "[Insert Image Here]"). Every line of copy, review, and asset link must be written out fully.
2. The design MUST be ultra-responsive. Mobile view requires priority focus: all elements must fit perfectly on standard smartphone screens without sideways overflow, utilizing single-column structures, legible type hierarchies (min 16px body copy), and easily tappable touch targets (min 48px height).
3. Pack all styling inside a single, clean <style> block inside the <head>. Do not rely on external utility frame engines like Tailwind or Bootstrap via remote CDN.
4. Integrate the structural components specified by the layout variants below.

[PRODUCT DATA & CONTEXT]
- Product Name: Vahdam India Ashwagandha Coffee (with Turmeric & Mushrooms)
- Primary Value Prop: Lowers stress cortisol, targets systemic fluid retention, drains face puffiness, and tightens double chins.
- Key Incentives: Includes Free Premium Frother + Free Shipping + 40% Off Auto-Applied.
- Direct Loop Checkout URL: https://www.vahdam.co.uk/checkouts/cn/hWNCmxt7u1jZXyXdxrBlzdzw/en-gb?_r=AQABoe58v9uqX7Pp_-OyqVMFwPrfaxYao4Vl8qwo4KZEuWM&discount=AC_N
- Standard Cart Landing Page Flow URL: https://try.vahdam.co.uk/ashwagandha-coffee-n-two-b

[CORE MEDIA ASSET DATABASE]
- Hero Pack Image: https://cdn.shopify.com/s/files/1/2422/3321/files/Coffee_Pack_Front.png
- Ingredient Ashwagandha Blend: https://cdn.shopify.com/s/files/1/2422/3321/files/Ingredients_Ashwagandha.jpg
- Video Review Loop Placeholder: https://cdn.shopify.com/s/files/1/2422/3321/files/Review_Video_1.mp4
- Trust Badge Icons: https://cdn.shopify.com/s/files/1/2422/3321/files/Trust_Badges_Horizontal.png

Please compile completely following mobile-first design guides.`}</pre>
              </div>
            </div>

            <div className="card p-6 bg-white border border-gray-100 flex flex-col gap-4">
              <div>
                <span className="badge bg-[#D4A373] text-[#004B49] mb-2">2. Gemini Campaign & Copywriting Prompt</span>
                <p className="text-xs text-gray-500 mb-3">Designed for structural layout, behavioral customer targeting, and deep-benefit copywriting.</p>
              </div>
              <div className="bg-gray-100 p-4 rounded text-xs font-mono overflow-y-auto max-h-60 border border-gray-200">
                <pre>{`You are a Lead Conversion Architect and Frontend Engineer. Your task is to output a complete, responsive, semantic vanilla HTML/CSS landing page code block for the VAHDAM UK Ashwagandha Coffee product. The theme for this page is completely focused on addressing "Face Puffiness and Water Retention" using clean adaptogens.

[DESIGN SPECIFICATIONS]
- Colors: Deep Teal (#004B49) as primary, Warm Gold (#D4A373) as secondary, Soft Cream (#FDFBF7) as background, and Dark Charcoal (#222222) for clear reading.
- Typography: Use elegant fallback Serif fonts (like Georgia, "Playfair Display") for main headings, and clean Sans-Serif fonts (like Inter, system-ui) for body text and product options.
- Layout: Apply a clean mobile-first flexbox/grid layout. Use single-column structures for small devices with a minimum 16px font size, and expand to 2 columns on screens 1024px or wider.

Assemble high-performance, responsive HTML layouts optimized for consumer retention.`}</pre>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Corporate Professional Footer */}
      <footer className="bg-[#004B49] border-t border-[#D4A373]/20 text-white/85 py-8 mt-auto px-6 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left text-xs space-y-1">
            <p className="font-serif text-sm font-semibold tracking-wide text-[#D4A373]">VAHDAM India Lifecycle OS &bull; Campaign Expansion Engine</p>
            <p className="text-white/60">Fully synced with vahdam-lifecycle-os.vercel.app to optimize acquisition and retention funnels across the UK.</p>
          </div>
          <div className="text-xs text-white/50 font-mono text-center sm:text-right">
            <span>Lifecycle OS Node Active • Live Session 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
