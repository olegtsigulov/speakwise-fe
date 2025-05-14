'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/features/auth/context/AuthContext';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { RegisterFormData } from '@/services/auth/auth.service';

// Validation schema
const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  companyName: z.string().min(2, 'Company name is required'),
  companyDomain: z.string().min(3, 'Company domain is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ValidatedRegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser, error: authError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidatedRegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: ValidatedRegisterFormData) => {
    setError(null);
    setIsSubmitting(true);

    // Remove confirmPassword before sending to API
    const { confirmPassword, ...registerData } = data;

    try {
      await registerUser(registerData);
    } catch (err) {
      setError('Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <LogoContainer>
          <Image 
            src="/logo.png" 
            alt="SpeakWise Logo" 
            width={120} 
            height={120}
            priority
          />
        </LogoContainer>
        <Title>Create your SpeakWise Account</Title>
        
        {(error || authError) && <ErrorMessage>{error || authError}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TwoColumnRow>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...register('firstName')}
                $hasError={!!errors.firstName}
              />
              {errors.firstName && <ErrorText>{errors.firstName.message}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...register('lastName')}
                $hasError={!!errors.lastName}
              />
              {errors.lastName && <ErrorText>{errors.lastName.message}</ErrorText>}
            </FormGroup>
          </TwoColumnRow>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Enter your company name"
              {...register('companyName')}
              $hasError={!!errors.companyName}
            />
            {errors.companyName && <ErrorText>{errors.companyName.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="companyDomain">Company Domain</Label>
            <Input
              id="companyDomain"
              type="text"
              placeholder="Enter your company domain"
              {...register('companyDomain')}
              $hasError={!!errors.companyDomain}
            />
            {errors.companyDomain && <ErrorText>{errors.companyDomain.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register('password')}
              $hasError={!!errors.password}
            />
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
              $hasError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoadingSpinner size="small" color="#ffffff" /> : 'Create Account'}
          </SubmitButton>

          <SignupText>
            Already have an account?{' '}
            <Link href="/login">Login</Link>
          </SignupText>
        </Form>
      </FormCard>
    </Container>
  );
}

// Styles
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  img {
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TwoColumnRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${props => props.$hasError ? '#e53e3e' : '#ddd'};
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const ErrorText = styled.span`
  color: #e53e3e;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  color: #e53e3e;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    background-color: #0060df;
  }
  
  &:disabled {
    background-color: #6494cc;
    cursor: not-allowed;
  }
`;

const SignupText = styled.p`
  font-size: 0.875rem;
  text-align: center;
  
  a {
    color: #0070f3;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`; 