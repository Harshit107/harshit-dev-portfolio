import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { personalData, socialLinks } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';

const ContactWrapper = styled.section`
  padding: 6rem 0;
  position: relative;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;

  @media (min-width: ${breakpoints.laptop}) {
    grid-template-columns: 1fr 1.15fr;
  }
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2.25rem;
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.85rem 1.15rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  transition: all 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentGlow};
    transform: translateY(-2px);
  }

  .icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: ${({ theme }) => theme.accentMuted};
    color: ${({ theme }) => theme.accent};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .details {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.2rem;

    .label {
      font-size: 0.75rem;
      font-family: 'JetBrains Mono', monospace;
      color: ${({ theme }) => theme.textMuted};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      font-size: 0.95rem;
      font-weight: 600;
      color: ${({ theme }) => theme.textPrimary};
      word-break: break-all;
    }
  }

  .copy-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${({ theme }) => theme.cardGlassBg};
    border: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      color: ${({ theme }) => theme.accent};
      border-color: ${({ theme }) => theme.accentGlow};
      transform: scale(1.05);
    }
  }
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1.15rem;
  border-radius: 14px;
  background: ${({ theme }) => theme.bgElevated};
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.textPrimary};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accentMuted};
    transform: translateY(-3px);
  }

  .name {
    font-size: 0.8125rem;
    font-weight: 600;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.825rem;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 500;
    color: ${({ theme }) => theme.textSecondary};
  }

  input,
  textarea {
    width: 100%;
    padding: 0.85rem 1.15rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.cardGlassBg};
    border: 1px solid ${({ theme }) => theme.borderColor};
    color: ${({ theme }) => theme.textPrimary};
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.accent};
      box-shadow: 0 0 15px ${({ theme }) => theme.accentGlow};
    }

    &::placeholder {
      color: ${({ theme }) => theme.textMuted};
    }
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

const FeedbackToast = styled(motion.div)`
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  background: ${({ theme }) => theme.accentMuted};
  border: 1px solid ${({ theme }) => theme.accentGlow};
  color: ${({ theme }) => theme.accent};
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setFormSent(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <ContactWrapper id="contact">
      <Container>
        <SectionHeading
          badge="GET IN TOUCH"
          title="Let's Build Something Exceptional"
          subtitle="Interested in collaborating, technical advisory, or exploring opportunities? Reach out anytime."
        />

        <ContactGrid>
          <InfoCol>
            <ContactCard tilt={false} glowOnHover={false}>
              <ContactRow>
                <div className="icon-wrap">
                  <Mail size={20} />
                </div>
                <div className="details">
                  <span className="label">Direct Email</span>
                  <span className="value">{personalData.email}</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(personalData.email, 'email')}
                  title="Copy email address"
                  aria-label="Copy email"
                >
                  {copiedKey === 'email' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </ContactRow>

              <ContactRow>
                <div className="icon-wrap">
                  <Mail size={20} />
                </div>
                <div className="details">
                  <span className="label">Secondary Email</span>
                  <span className="value">{personalData.secondaryEmail}</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(personalData.secondaryEmail, 'sec-email')}
                  title="Copy secondary email"
                  aria-label="Copy secondary email"
                >
                  {copiedKey === 'sec-email' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </ContactRow>

              <ContactRow>
                <div className="icon-wrap">
                  <Phone size={20} />
                </div>
                <div className="details">
                  <span className="label">Phone / WhatsApp</span>
                  <span className="value">{personalData.phone}</span>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => handleCopy(personalData.phone, 'phone')}
                  title="Copy phone number"
                  aria-label="Copy phone"
                >
                  {copiedKey === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </ContactRow>

              <ContactRow>
                <div className="icon-wrap">
                  <MapPin size={20} />
                </div>
                <div className="details">
                  <span className="label">Location</span>
                  <span className="value">
                    {personalData.location}
                  </span>
                </div>
              </ContactRow>

              <SocialGrid>
                {socialLinks.map((s) => {
                  const Icon = s.icon === 'github' ? GithubIcon : s.icon === 'linkedin' ? LinkedinIcon : TwitterIcon;
                  return (
                    <SocialButton
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon size={20} />
                      <span className="name">{s.name}</span>
                    </SocialButton>
                  );
                })}
              </SocialGrid>
            </ContactCard>
          </InfoCol>

          <FormCol>
            <GlassCard tilt={false} glowOnHover>
              <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="name">YOUR NAME</label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">EMAIL ADDRESS</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">YOUR MESSAGE</label>
                  <textarea
                    id="message"
                    required
                    placeholder="Tell me about your project, idea, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </FormGroup>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<Send size={18} />}
                >
                  Send Message
                </Button>

                <AnimatePresence>
                  {formSent && (
                    <FeedbackToast
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <Check size={18} />
                      <span>Thank you! Your message has been prepared. I'll get back to you shortly.</span>
                    </FeedbackToast>
                  )}
                </AnimatePresence>
              </StyledForm>
            </GlassCard>
          </FormCol>
        </ContactGrid>
      </Container>
    </ContactWrapper>
  );
};
