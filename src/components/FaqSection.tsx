
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can Skrypto be completely anonymous?",
    answer: "Skrypto operates entirely on blockchain technology. We never collect personal information, KYC documents, or identifying details. Your wallet address is your only identity on the platform, and all transactions are conducted through smart contracts that preserve your privacy."
  },
  {
    question: "Is it legal to earn money without paying taxes?",
    answer: "Skrypto provides a platform for pseudonymous transactions between parties. We do not provide tax advice and cannot speak to the tax laws in your jurisdiction. Users are responsible for understanding and complying with their local tax regulations. We simply provide the technology for direct peer-to-peer transactions."
  },
  {
    question: "Which cryptocurrencies are supported?",
    answer: "We currently support payments in ETH, USDC, DAI, and other major ERC-20 tokens on Ethereum, as well as native tokens on other major blockchains like Solana, Binance Smart Chain, and Polygon. We're constantly adding support for more cryptocurrencies based on community demand."
  },
  {
    question: "How are disputes resolved without identity verification?",
    answer: "Our platform utilizes smart contract escrow systems where funds are only released when predefined conditions are met. For more complex disputes, we have a decentralized arbitration system where community members serve as impartial jurors, making decisions based solely on the evidence provided, not the identities involved."
  },
  {
    question: "What happens if I lose access to my wallet?",
    answer: "Since your wallet is your identity on Skrypto, losing access to it means losing access to your account and any funds within it. We strongly recommend using secure wallet solutions and backing up your seed phrases. Unfortunately, due to the decentralized nature of the platform, we cannot assist in recovering lost wallets or funds."
  },
  {
    question: "Are there any fees for using Skrypto?",
    answer: "Skrypto charges minimal protocol fees (currently 1%) that go toward platform maintenance, development, and our DAO treasury. These fees are significantly lower than traditional freelance platforms which often charge 20% or more. Users only pay standard network gas fees beyond this."
  },
];

const FaqSection = () => {
  return (
    <section className="py-20 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Frequently </span>
            <span className="text-gradient-blue">Asked Questions</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Everything you need to know about using the Skrypto platform.
          </p>
        </div>
        
        <div className="glass p-2 sm:p-6 rounded-xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 last:border-0">
                <AccordionTrigger className="text-white text-lg font-medium py-4 hover:text-skrypto-purple transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
