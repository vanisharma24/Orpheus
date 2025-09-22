import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { rewardCollaboration } from '../ic/api';

interface CollaborationRewardsProps {
  projectId: string;
  collaborators: Array<{ principal: string; role: string; rewardAmount: number }>;
  onRewardDistributed: () => void;
}

const CollaborationRewards: React.FC<CollaborationRewardsProps> = ({
  projectId,
  collaborators,
  onRewardDistributed
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalReward, setTotalReward] = useState(100); // Default reward pool

  const handleDistributeRewards = async () => {
    if (collaborators.length === 0) {
      setError('No collaborators to reward');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Calculate individual rewards based on role and contribution
      const rewardDistribution = collaborators.map(collaborator => [
        collaborator.principal,
        collaborator.rewardAmount
      ] as [string, number]);

      await rewardCollaboration(projectId, rewardDistribution, `Collaboration rewards for project ${projectId}`);

      setSuccess(`Successfully distributed ${totalReward} MUSE tokens to ${collaborators.length} collaborators!`);
      onRewardDistributed();
    } catch (err: any) {
      console.error('Reward distribution error:', err);
      setError(err.message || 'Failed to distribute rewards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateCollaboratorReward = (index: number, amount: number) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index].rewardAmount = amount;
    // Recalculate total
    const newTotal = updatedCollaborators.reduce((sum, collab) => sum + collab.rewardAmount, 0);
    setTotalReward(newTotal);
  };

  return (
    <div className="bg-[#000000] border border-[#730202] rounded-xl p-6">
      <h3 className="text-xl font-poppins font-semibold mb-4 text-[#f5f5f5]">
        🎁 Collaboration Rewards
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-poppins text-[#f5f5f5] mb-2">
          Total Reward Pool (MUSE)
        </label>
        <input
          type="number"
          value={totalReward}
          onChange={(e) => setTotalReward(Number(e.target.value))}
          className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#730202] rounded-lg text-[#f5f5f5] font-poppins focus:outline-none focus:border-[#8a0303]"
          min="0"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-poppins font-medium mb-3 text-[#f5f5f5]">
          Collaborator Rewards
        </h4>
        <div className="space-y-3">
          {collaborators.map((collaborator, index) => (
            <div key={index} className="flex items-center justify-between bg-[#1a1a1a] p-3 rounded-lg">
              <div>
                <div className="font-poppins text-[#f5f5f5]">{collaborator.principal.slice(0, 20)}...</div>
                <div className="text-sm text-gray-400">{collaborator.role}</div>
              </div>
              <input
                type="number"
                value={collaborator.rewardAmount}
                onChange={(e) => updateCollaboratorReward(index, Number(e.target.value))}
                className="w-20 px-2 py-1 bg-[#000000] border border-[#730202] rounded text-[#f5f5f5] font-poppins text-center focus:outline-none focus:border-[#8a0303]"
                min="0"
                disabled={loading}
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-red-400 text-sm font-poppins bg-red-900/20 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-400 text-sm font-poppins bg-green-900/20 p-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      <button
        onClick={handleDistributeRewards}
        disabled={loading || collaborators.length === 0}
        className="w-full bg-[#730202] hover:bg-[#8a0303] disabled:bg-gray-600 text-[#f5f5f5] font-poppins font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <LoadingSpinner size="sm" color="#f5f5f5" />
            <span>Distributing Rewards...</span>
          </>
        ) : (
          <span>Distribute Rewards</span>
        )}
      </button>

      <div className="mt-3 text-xs text-gray-500 font-poppins text-center">
        Rewards will be automatically minted and distributed to collaborators
      </div>
    </div>
  );
};

export default CollaborationRewards;
