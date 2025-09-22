import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { getBalance, getTokenInfo } from '../ic/api';

interface TokenBalanceProps {
  principal: string;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ principal }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch token info and balance in parallel
        const [balanceResponse, tokenInfoResponse] = await Promise.all([
          getBalance(principal),
          getTokenInfo()
        ]);

        setBalance(Number(balanceResponse.balance));
        setTokenInfo(tokenInfoResponse);
      } catch (err) {
        console.error('Error fetching token data:', err);
        setError('Failed to load token balance');
      } finally {
        setLoading(false);
      }
    };

    if (principal) {
      fetchTokenData();
    }
  }, [principal]);

  const formatBalance = (balance: number) => {
    if (tokenInfo && tokenInfo.decimals) {
      return (balance / Math.pow(10, tokenInfo.decimals)).toFixed(2);
    }
    return balance.toString();
  };

  if (loading) {
    return (
      <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
        <h3 className="text-xl font-poppins font-semibold mb-4 text-[#f5f5f5]">
          $MUSE Token Balance
        </h3>
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
        <h3 className="text-xl font-poppins font-semibold mb-4 text-[#f5f5f5]">
          $MUSE Token Balance
        </h3>
        <div className="text-red-400 text-center py-4">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
      <h3 className="text-xl font-poppins font-semibold mb-4 text-[#f5f5f5]">
        $MUSE Token Balance
      </h3>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#730202] mb-2">
          {balance !== null ? formatBalance(balance) : '0.00'}
        </div>
        <div className="text-gray-400 font-poppins">
          {tokenInfo ? tokenInfo.symbol : 'MUSE'} Tokens
        </div>
        {tokenInfo && (
          <div className="text-sm text-gray-500 mt-2">
            Total Supply: {formatBalance(Number(tokenInfo.total_supply))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenBalance;
