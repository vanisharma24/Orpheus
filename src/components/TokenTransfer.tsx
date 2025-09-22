import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { transferTokens } from '../ic/api';

interface TokenTransferProps {
  userPrincipal: string;
  onTransferSuccess: () => void;
}

const TokenTransfer: React.FC<TokenTransferProps> = ({ userPrincipal, onTransferSuccess }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipient.trim() || !amount.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      await transferTokens(recipient, transferAmount);

      setSuccess(`Successfully transferred ${transferAmount} MUSE tokens to ${recipient}`);
      setRecipient('');
      setAmount('');

      // Call the success callback to refresh balance
      onTransferSuccess();
    } catch (err: any) {
      console.error('Transfer error:', err);
      setError(err.message || 'Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
      <h3 className="text-xl font-poppins font-semibold mb-4 text-[#f5f5f5]">
        Transfer $MUSE Tokens
      </h3>

      <form onSubmit={handleTransfer} className="space-y-4">
        <div>
          <label className="block text-sm font-poppins text-[#f5f5f5] mb-2">
            Recipient Principal ID
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient's principal ID"
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#730202] rounded-lg text-[#f5f5f5] font-poppins focus:outline-none focus:border-[#8a0303]"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-poppins text-[#f5f5f5] mb-2">
            Amount (MUSE)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#730202] rounded-lg text-[#f5f5f5] font-poppins focus:outline-none focus:border-[#8a0303]"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm font-poppins bg-red-900/20 p-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-400 text-sm font-poppins bg-green-900/20 p-3 rounded-lg">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#730202] hover:bg-[#8a0303] disabled:bg-gray-600 text-[#f5f5f5] font-poppins font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="#f5f5f5" />
              <span>Transferring...</span>
            </>
          ) : (
            <span>Transfer Tokens</span>
          )}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 font-poppins">
        <p>Your Principal: {userPrincipal}</p>
      </div>
    </div>
  );
};

export default TokenTransfer;
