import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './ChatAnalysisHeader.scss'

export type ChatAnalysisMode = 'private' | 'group'

interface ChatAnalysisHeaderProps {
  currentMode: ChatAnalysisMode
}

const MODE_CONFIG: Record<ChatAnalysisMode, { label: string; path: string }> = {
  private: {
    label: '私聊分析',
    path: '/analytics/private'
  },
  group: {
    label: '群聊分析',
    path: '/analytics/group'
  }
}

function ChatAnalysisHeader({ currentMode }: ChatAnalysisHeaderProps) {
  const navigate = useNavigate()
  const currentLabel = MODE_CONFIG[currentMode].label

  return (
    <div className="chat-analysis-header">
      <button
        type="button"
        className="chat-analysis-back"
        onClick={() => navigate('/analytics')}
      >
        <ChevronLeft size={16} />
        <span>返回聊天分析</span>
      </button>

      <div className="chat-analysis-breadcrumb">
        <span>聊天分析</span>
        <span className="chat-analysis-breadcrumb-separator">/</span>
        <span className="current">{currentLabel}</span>
      </div>

      <div className="chat-analysis-switcher" role="tablist" aria-label="聊天分析类型">
        {(Object.entries(MODE_CONFIG) as Array<[ChatAnalysisMode, { label: string; path: string }]>).map(([mode, config]) => (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={mode === currentMode}
            className={`chat-analysis-switcher-item ${mode === currentMode ? 'active' : ''}`}
            onClick={() => {
              if (mode !== currentMode) {
                navigate(config.path)
              }
            }}
          >
            {config.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ChatAnalysisHeader
