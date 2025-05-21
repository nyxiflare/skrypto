
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface MarketplaceFiltersProps {
  categoryFilter: string;
  tokenFilter: string;
  skillFilter: string;
  onFilterChange: (filterType: string, value: string) => void;
}

const MarketplaceFilters = ({ 
  categoryFilter, 
  tokenFilter, 
  skillFilter, 
  onFilterChange 
}: MarketplaceFiltersProps) => {
  return (
    <Card className="bg-skrypto-card border-white/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter size={18} />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select 
            value={categoryFilter} 
            onValueChange={(value) => onFilterChange('category', value)}
          >
            <SelectTrigger id="category" className="bg-skrypto-darker border-white/10">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-skrypto-card border-white/10">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="token">Payment Token</Label>
          <Select 
            value={tokenFilter} 
            onValueChange={(value) => onFilterChange('token', value)}
          >
            <SelectTrigger id="token" className="bg-skrypto-darker border-white/10">
              <SelectValue placeholder="All Tokens" />
            </SelectTrigger>
            <SelectContent className="bg-skrypto-card border-white/10">
              <SelectItem value="all">All Tokens</SelectItem>
              <SelectItem value="ETH">ETH</SelectItem>
              <SelectItem value="USDT">USDT</SelectItem>
              <SelectItem value="USDC">USDC</SelectItem>
              <SelectItem value="BTC">BTC</SelectItem>
              <SelectItem value="SOL">SOL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skill">Skill Type</Label>
          <Select 
            value={skillFilter} 
            onValueChange={(value) => onFilterChange('skill', value)}
          >
            <SelectTrigger id="skill" className="bg-skrypto-darker border-white/10">
              <SelectValue placeholder="All Skills" />
            </SelectTrigger>
            <SelectContent className="bg-skrypto-card border-white/10">
              <SelectItem value="all">All Skills</SelectItem>
              <SelectItem value="coding">Coding</SelectItem>
              <SelectItem value="blockchain">Blockchain</SelectItem>
              <SelectItem value="ui-design">UI Design</SelectItem>
              <SelectItem value="copywriting">Copywriting</SelectItem>
              <SelectItem value="seo">SEO</SelectItem>
              <SelectItem value="social-media">Social Media</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceFilters;
