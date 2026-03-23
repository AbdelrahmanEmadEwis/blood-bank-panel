'use client';
import { useActionState, useEffect } from 'react';
import { User, Mail, Shield, KeySquare, Signature } from 'lucide-react';
import { registerAction } from '@/features/auth';
import { Input, SubmitButton, PasswordInput } from '@/components/forms';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function RegisterViewPage() {
  const router = useRouter();
  const [state, action] = useActionState(registerAction, {
    status: 'idle',
    message: '',
  });

  const fe = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === 'success') {
      toast.success(state.message, { id: 'register-success' });
      router.push('/');
    } else if (state.status === 'error' && state.message) {
      toast.error(state.message, { id: 'register-error' });
    }
  }, [state.status, state.message, router]);

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-linear-to-br from-[#0a192f] via-[#1d4ed8] to-[#4d80e4] p-4 font-sans'>
      {/* Background Pattern */}
      <div className='absolute inset-0 opacity-10 pointer-events-none'>
        <div className='absolute top-10 left-10 h-72 w-72 animate-pulse rounded-full bg-white blur-xl filter'></div>
        <div className='absolute top-20 right-10 h-72 w-72 animate-pulse rounded-full bg-blue-200 blur-xl filter' style={{ animationDelay: '2s' }}></div>
      </div>

      <div className='relative z-10 w-full max-w-2xl rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-sm'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Create Employee Account</h1>
          <p className='text-gray-600'>Register a new employee for the admin portal</p>
        </div>

        {state.status === 'error' && !Object.keys(fe).length && (
          <div className='mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700 font-medium'>
            {state.message}
          </div>
        )}

        <form action={action} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700'>First Name</label>
              <div className='relative'>
                <User className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input name='fname' placeholder='John' className='pl-11 h-12' error={fe.fname?.[0]} />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700'>Last Name</label>
              <div className='relative'>
                <User className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input name='lname' placeholder='Doe' className='pl-11 h-12' error={fe.lname?.[0]} />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700'>Email Address</label>
              <div className='relative'>
                <Mail className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input name='email' type='email' placeholder='john@example.com' className='pl-11 h-12' error={fe.email?.[0]} />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700'>Role</label>
              <div className='relative'>
                <Shield className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input name='role' placeholder='admin/user' className='pl-11 h-12' error={fe.role?.[0]} />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700'>Password</label>
              <div className='relative'>
                <KeySquare className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <PasswordInput name='password' placeholder='Minimum 2 characters' className='pl-11 h-12' error={fe.password?.[0]} />
              </div>
            </div>

            <div className='space-y-1.5'>
              <label className='text-sm font-medium text-slate-700'>Signature Code</label>
              <div className='relative'>
                <Signature className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                <Input name='signature_code' placeholder='Enter your unique code' className='pl-11 h-12' error={fe.signature_code?.[0]} />
              </div>
            </div>
          </div>

          <div className='pt-2'>
            <SubmitButton pendingLabel='Registering...' className='h-12 w-full rounded-xl bg-linear-to-r from-[#1d4ed8] to-[#4d80e4] font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]'>
              Register Employee
            </SubmitButton>
          </div>
        </form>

        <div className='mt-8 text-center text-sm text-gray-500'>
          Already have an account? <button onClick={() => router.push('/')} className='text-blue-600 font-semibold hover:underline'>Sign In</button>
        </div>
      </div>
    </div>
  );
}
