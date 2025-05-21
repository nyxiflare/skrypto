
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Gig } from '@/data/marketplace-data';

interface GigCardProps {
  gig: Gig;
  viewMode: 'grid' | 'list';
}

const GigCard = ({ gig, viewMode }: GigCardProps) => {
  const { toast } = useToast();
  
  const handleViewDetails = () => {
    toast({
      title: "Viewing Gig Details",
      description: `You're viewing details for "${gig.title}"`,
    });
  };

  if (viewMode === 'list') {
    return (
      <Card className="bg-skrypto-card border-white/5 hover:glow-purple transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-skrypto-purple/20 text-skrypto-purple border-none">
                  {gig.category}
                </Badge>
                {gig.skills.slice(0, 2).map(skill => (
                  <Badge key={skill} variant="outline" className="border-white/10 text-white/70">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{gig.title}</h3>
              <p className="text-white/70 mb-3 line-clamp-2">{gig.description}</p>
              
              <div className="flex items-center">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white ml-1">{gig.rating}</span>
                  <span className="text-white/50 ml-2">({gig.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end justify-between h-full">
              <div className="text-xl font-bold text-skrypto-green mb-4 md:mb-0">
                {gig.price} {gig.paymentToken}
              </div>
              <Button
                onClick={handleViewDetails}
                className="bg-skrypto-blue hover:bg-skrypto-blue/80"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="bg-skrypto-card border-white/5 hover:glow-purple transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Badge className="bg-skrypto-purple/20 text-skrypto-purple border-none">
            {gig.category}
          </Badge>
          <div className="text-xl font-bold text-skrypto-green">{gig.price} {gig.paymentToken}</div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-white">{gig.title}</h3>
        <p className="text-white/70 mb-4 line-clamp-3">{gig.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {gig.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="outline" className="border-white/10 text-white/70">
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white ml-1">{gig.rating}</span>
            <span className="text-white/50 ml-2">({gig.reviews} reviews)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleViewDetails}
          className="w-full bg-skrypto-blue hover:bg-skrypto-blue/80"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GigCard;
