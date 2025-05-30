
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileHeader from '@/components/freelancer/ProfileHeader';
import FreelancerTabs from '@/components/freelancer/FreelancerTabs';
import LeaveReviewForm from '@/components/reviews/LeaveReviewForm';
import { useGetFreelancerProfile, useSubmitReview } from '@/hooks/useFreelancerProfile';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FreelancerProfilePage = () => {
  const { freelancerId } = useParams<{ freelancerId: string }>();
  const navigate = useNavigate();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: profileData, isLoading, error } = useGetFreelancerProfile(freelancerId || '');
  const submitReviewMutation = useSubmitReview();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-skrypto-dark">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="glass border-white/10">
            <CardContent className="p-12 text-center">
              <div className="animate-pulse">
                <div className="h-32 w-32 bg-skrypto-purple/20 rounded-full mx-auto mb-4"></div>
                <div className="h-8 w-64 bg-skrypto-purple/20 rounded mx-auto mb-2"></div>
                <div className="h-4 w-96 bg-skrypto-purple/10 rounded mx-auto"></div>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-skrypto-dark">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Card className="glass border-white/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Profile not found</h2>
              <p className="text-white/70 mb-6">
                The freelancer profile you are looking for does not exist.
              </p>
              <Button onClick={() => navigate('/explore')}>
                Back to Explore
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const { profile, skills, portfolio, reviews } = profileData;

  const averageRating = reviews?.length > 0
    ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / reviews.length
    : 0;

  const handleMessage = () => {
    navigate(`/inbox/${freelancerId}`);
  };

  const handleHire = () => {
    // TODO: Implement hire functionality
    console.log('Hire freelancer:', freelancerId);
  };

  const handleSubmitReview = (rating: number, comment?: string) => {
    if (!freelancerId) return;

    submitReviewMutation.mutate(
      { freelancer_id: freelancerId, rating, comment },
      {
        onSuccess: () => {
          setShowReviewForm(false);
        }
      }
    );
  };

  // Mock data for hasHiredBefore - in real app, check against user's hiring history
  const hasHiredBefore = false;

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/explore')}
            className="text-white/70 hover:text-white hover:bg-white/5"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Explore
          </Button>
        </div>

        <div className="space-y-8">
          <ProfileHeader
            freelancer={profile}
            skills={skills || []}
            averageRating={averageRating}
            totalReviews={reviews?.length || 0}
            onMessage={handleMessage}
            onHire={handleHire}
          />

          <FreelancerTabs
            portfolioItems={portfolio || []}
            reviews={reviews || []}
            averageRating={averageRating}
            walletAddress={profile.wallet_address}
            hasHiredBefore={hasHiredBefore}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {!showReviewForm ? (
                <Card className="glass border-white/10">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-white text-xl mb-4">Worked with this freelancer?</h3>
                    <Button
                      onClick={() => setShowReviewForm(true)}
                      className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple"
                    >
                      Leave a Review
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <LeaveReviewForm
                  freelancerId={freelancerId || ''}
                  onSubmitReview={handleSubmitReview}
                  isSubmitting={submitReviewMutation.isPending}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FreelancerProfilePage;
