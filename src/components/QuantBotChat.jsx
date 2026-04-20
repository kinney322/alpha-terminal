import React, { useState, useRef, useEffect } from 'react';

export default function QuantBotChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '我是你的 Quant 探勘大腦。\n請問你要什麼公司股價歷史數據？' }
  ]);
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    const userMessage = inputUrl.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputUrl('');
    setIsLoading(true);

    try {
      const apiUrl = (import.meta.env.VITE_KW_API || 'http://127.0.0.1:8787') + '/quant-chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API 呼叫失敗');
      }

      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: data.answer,
          sql: data.sql,
          raw_data: data.data,
          model: data.model 
        }
      ]);
      
    } catch (error) {
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: `[系統錯誤] ${error.message}`, error: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDataPreview = (dataArray) => {
    if (!dataArray || dataArray.length === 0) return '無資料 (0 rows)';
    const preview = JSON.stringify(dataArray.slice(0, 3), null, 2);
    return dataArray.length > 3 ? `${preview}\n... (共 ${dataArray.length} 筆)` : preview;
  };

  return (
    <div className="quant-chat-container fade-in">
      <div className="section-title">
        <h2 style={{ margin: 0, fontSize: '20px', fontFamily: '"Playfair Display", serif' }}>Quant 探勘終端</h2>
        <span style={{ fontSize: '12px', background: 'var(--accent-gold-bg)', color: 'var(--accent-gold)', padding: '2px 8px', borderRadius: '12px', marginLeft: '12px', fontWeight: 'bold' }}>Llama 4 / 3.1 Edge Engine</span>
      </div>

      <div className="chat-messages-area">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            <div className="message-header">
              {msg.role === 'user' ? 'YOU' : 'ALPHA EDGE'}
            </div>
            
            <div className="message-content">
              <span className={msg.error ? 'error-text' : ''}>{msg.content}</span>
            </div>

            {msg.sql && (
              <div className="sql-box">
                <div className="sql-box-title">執行之 SQL (D1 SQLite)</div>
                <code>{msg.sql}</code>
              </div>
            )}
            
            {msg.raw_data && (
              <div className="data-box">
                <div className="data-box-title">冷數據回傳快照</div>
                <pre>{formatDataPreview(msg.raw_data)}</pre>
              </div>
            )}
            
            {msg.model && (
              <div className="model-badge">Engine: {msg.model}</div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="chat-message assistant">
            <div className="message-header">ALPHA EDGE</div>
            <div className="message-content loading-pulse">對撞 D1 水庫中...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-area" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="例如：撈出過去一個月，NVDA在星期五的漲跌幅勝率..."
          disabled={isLoading}
          autoFocus
        />
        <button type="submit" disabled={isLoading || !inputUrl.trim()} className={inputUrl.trim() ? 'active' : ''}>
          發射指令
        </button>
      </form>
    </div>
  );
}
