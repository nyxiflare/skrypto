
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Image as ImageIcon, Calendar } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  media_url?: string;
  created_at: string;
}

interface PortfolioGalleryProps {
  portfolioItems: PortfolioItem[];
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ portfolioItems }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const isImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  };

  if (portfolioItems.length === 0) {
    return (
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ImageIcon size={20} />
            Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ImageIcon size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No portfolio items yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ImageIcon size={20} />
          Portfolio ({portfolioItems.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-colors"
            >
              {item.media_url && isImageUrl(item.media_url) ? (
                <div className="aspect-video bg-white/5 relative">
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-video bg-white/5 flex items-center justify-center">
                  <ImageIcon size={32} className="text-white/40" />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="text-white font-medium mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                {item.description && (
                  <p className="text-white/70 text-sm mb-3 line-clamp-3">
                    {item.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-white/50 text-xs">
                    <Calendar size={12} />
                    {formatDate(item.created_at)}
                  </div>
                  
                  {item.media_url && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/10 p-1 h-auto"
                      onClick={() => window.open(item.media_url, '_blank')}
                    >
                      <ExternalLink size={14} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioGallery;
