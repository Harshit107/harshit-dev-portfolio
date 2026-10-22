import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../ui/SocialIcons';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { personalData, socialLinks } from '../../data/portfolioData';
import { breakpoints } from '../../theme/theme';
import DOMAINS from '../../config/domain';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

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

const Spinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

const FeedbackToast = styled(motion.div)<{ $variant?: 'success' | 'error' }>`
  padding: 0.95rem 1.25rem;
  border-radius: 12px;
  background: ${({ theme, $variant }) =>
    $variant === 'error' ? 'rgba(239, 68, 68, 0.12)' : theme.accentMuted};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'error' ? 'rgba(239, 68, 68, 0.35)' : theme.accentGlow};
  color: ${({ theme, $variant }) =>
    $variant === 'error' ? '#ef4444' : theme.accent};
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  .header-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
  }

  .fallback-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 0.4rem;
  }
`;

const FallbackBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.25);
    text-decoration: none;
  }
`;

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      // Integrated with Harshit's live FreelyEmail-API endpoint
      const response = await fetch(`${DOMAINS.EMAIL.API_V1_EMAILS}send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          to: 'Harshit107.in@gmail.com',
          recipient: 'Harshit107.in@gmail.com',
          appName: 'Harshit Developer Portfolio',
          app: 'Harshit Developer Portfolio',
          sender: formData.name,
          replyTo: formData.email,
          subject: `Portfolio Message from ${formData.name}`,
          message: `Sender Name: ${formData.name}\nSender Email: ${formData.email}\n\nMessage:\n${formData.message}`
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (!data || data.success !== false)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setStatus('success');
        setStatusMessage("Thank you! Your message was delivered directly via FreelyEmail API. I'll get back to you shortly.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorDesc = data?.error?.message || `Server responded with status ${response.status}`;
        throw new Error(errorDesc);
      }
    } catch (err: unknown) {
      console.warn('FreelyEmail API dispatch error, enabling fallback:', err);
      setStatus('error');
      setStatusMessage('Direct API dispatch encountered a network interruption. You can send instantly via your email client:');
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoFallbackUrl = `mailto:${personalData.email}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name || 'Developer Contact'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </FormGroup>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={isSubmitting ? <Spinner size={18} /> : <Send size={18} />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending via FreelyEmail API...' : 'Send Message'}
                </Button>

                <AnimatePresence>
                  {status === 'success' && (
                    <FeedbackToast
                      $variant="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="header-row">
                        <Check size={18} />
                        <span>Dispatched successfully!</span>
                      </div>
                      <div>{statusMessage}</div>
                    </FeedbackToast>
                  )}

                  {status === 'error' && (
                    <FeedbackToast
                      $variant="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className="header-row">
                        <AlertCircle size={18} />
                        <span>API Delivery Notice</span>
                      </div>
                      <div>{statusMessage}</div>
                      <div className="fallback-actions">
                        <FallbackBtn href={mailtoFallbackUrl}>
                          <Mail size={14} /> Open in Email App <ExternalLink size={12} />
                        </FallbackBtn>
                        <FallbackBtn
                          as="button"
                          type="button"
                          onClick={() => handleCopy(`${formData.name} (${formData.email}): ${formData.message}`, 'copied-msg')}
                        >
                          <Copy size={14} /> Copy Message
                        </FallbackBtn>
                      </div>
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
