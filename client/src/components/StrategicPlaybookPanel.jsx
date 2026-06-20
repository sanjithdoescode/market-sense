import { useState } from 'react';
import {
  Grid,
  Milestone,
  DollarSign,
  AlertTriangle,
  Megaphone,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

function StrategicPlaybookPanel({ swotAnalysis, financialProjections, riskAssessment = [], marketingPlaybook = [], implementationRoadmap = [] }) {
  const [activeTab, setActiveTab] = useState('swot');

  // Check if we have strategic playbook data at all (for backward compatibility)
  const hasSwot = swotAnalysis && (swotAnalysis.strengths?.length > 0 || swotAnalysis.weaknesses?.length > 0 || swotAnalysis.opportunities?.length > 0 || swotAnalysis.threats?.length > 0);
  const hasFinancials = financialProjections && (financialProjections.capexRange || financialProjections.opexRange || financialProjections.estimatedBreakEven);
  const hasRisks = riskAssessment && riskAssessment.length > 0;
  const hasMarketing = marketingPlaybook && marketingPlaybook.length > 0;
  const hasRoadmap = implementationRoadmap && implementationRoadmap.length > 0;

  const hasPlaybook = hasSwot || hasFinancials || hasRisks || hasMarketing || hasRoadmap;

  if (!hasPlaybook) {
    return (
      <section className="panel empty-playbook-panel animate-in" style={{ animationDelay: '0.4s' }}>
        <div className="panel-heading compact">
          <div>
            <p className="eyebrow">Strategic Playbook</p>
            <h2>Plan & Roadmap Unavailable</h2>
          </div>
        </div>
        <p className="text-muted" style={{ fontStyle: 'italic', margin: 0 }}>
          This market analysis record was generated on an older version of the engine and does not contain strategic playbook fields. Run a new analysis to receive full premium SWOT matrices, setup roadmaps, financial cost estimates, risk mitigations, and target audience marketing plans.
        </p>
      </section>
    );
  }

  return (
    <section className="panel strategic-playbook-panel animate-in" style={{ animationDelay: '0.4s' }}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Premium Feature</p>
          <h2>Strategic Business Playbook</h2>
        </div>
        <div className="premium-badge">
          <Sparkles size={14} style={{ color: 'var(--amber)' }} />
          <span>PRO EXECUTIVE</span>
        </div>
      </div>

      {/* Tabs Selector */}
      <div className="playbook-tabs" role="tablist" aria-label="Strategic playbook views">
        {hasSwot && (
          <button
            className={`playbook-tab ${activeTab === 'swot' ? 'active' : ''}`}
            onClick={() => setActiveTab('swot')}
            role="tab"
            aria-selected={activeTab === 'swot'}
            id="tab-swot"
            aria-controls="panel-swot"
          >
            <Grid size={15} aria-hidden="true" />
            <span>SWOT Matrix</span>
          </button>
        )}
        {hasRoadmap && (
          <button
            className={`playbook-tab ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
            role="tab"
            aria-selected={activeTab === 'roadmap'}
            id="tab-roadmap"
            aria-controls="panel-roadmap"
          >
            <Milestone size={15} aria-hidden="true" />
            <span>Setup Roadmap</span>
          </button>
        )}
        {hasFinancials && (
          <button
            className={`playbook-tab ${activeTab === 'financials' ? 'active' : ''}`}
            onClick={() => setActiveTab('financials')}
            role="tab"
            aria-selected={activeTab === 'financials'}
            id="tab-financials"
            aria-controls="panel-financials"
          >
            <DollarSign size={15} aria-hidden="true" />
            <span>Financial Estimator</span>
          </button>
        )}
        {hasRisks && (
          <button
            className={`playbook-tab ${activeTab === 'risks' ? 'active' : ''}`}
            onClick={() => setActiveTab('risks')}
            role="tab"
            aria-selected={activeTab === 'risks'}
            id="tab-risks"
            aria-controls="panel-risks"
          >
            <ShieldAlert size={15} aria-hidden="true" />
            <span>Risk Assessment</span>
          </button>
        )}
        {hasMarketing && (
          <button
            className={`playbook-tab ${activeTab === 'marketing' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketing')}
            role="tab"
            aria-selected={activeTab === 'marketing'}
            id="tab-marketing"
            aria-controls="panel-marketing"
          >
            <Megaphone size={15} aria-hidden="true" />
            <span>Marketing Playbook</span>
          </button>
        )}
      </div>

      {/* Tab Panels */}
      <div className="playbook-content">
        {/* SWOT PANEL */}
        {activeTab === 'swot' && hasSwot && (
          <div id="panel-swot" role="tabpanel" aria-labelledby="tab-swot" className="swot-grid animate-in">
            <div className="swot-box swot-strengths">
              <h3>
                <span className="swot-indicator strengths">S</span> Strengths
              </h3>
              <ul>
                {swotAnalysis.strengths.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="swot-box swot-weaknesses">
              <h3>
                <span className="swot-indicator weaknesses">W</span> Weaknesses
              </h3>
              <ul>
                {swotAnalysis.weaknesses.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="swot-box swot-opportunities">
              <h3>
                <span className="swot-indicator opportunities">O</span> Opportunities
              </h3>
              <ul>
                {swotAnalysis.opportunities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="swot-box swot-threats">
              <h3>
                <span className="swot-indicator threats">T</span> Threats
              </h3>
              <ul>
                {swotAnalysis.threats.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ROADMAP PANEL */}
        {activeTab === 'roadmap' && hasRoadmap && (
          <div id="panel-roadmap" role="tabpanel" aria-labelledby="tab-roadmap" className="roadmap-flow animate-in">
            {implementationRoadmap.map((phase, idx) => (
              <div key={idx} className="roadmap-step">
                <div className="roadmap-marker">
                  <div className="roadmap-node">{idx + 1}</div>
                  {idx < implementationRoadmap.length - 1 && <div className="roadmap-line"></div>}
                </div>
                <div className="roadmap-details">
                  <div className="roadmap-phase-header">
                    <h4>{phase.phaseName}</h4>
                    <span className="roadmap-timeline-tag">
                      <Clock size={12} aria-hidden="true" />
                      <span>{phase.timelineEstimate}</span>
                    </span>
                  </div>
                  <ul className="roadmap-tasks">
                    {(phase.keyTasks || []).map((task, tIdx) => (
                      <li key={tIdx}>
                        <CheckCircle2 size={14} className="task-check" aria-hidden="true" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FINANCIALS PANEL */}
        {activeTab === 'financials' && hasFinancials && (
          <div id="panel-financials" role="tabpanel" aria-labelledby="tab-financials" className="financials-view animate-in">
            <div className="cost-grid">
              <div className="cost-card capex">
                <span className="cost-label">Est. Capital Expense (CapEx)</span>
                <span className="cost-amount">{financialProjections.capexRange || 'N/A'}</span>
                <p className="cost-note">One-time launch & setup costs</p>
              </div>
              <div className="cost-card opex">
                <span className="cost-label">Est. Monthly Operating Expense (OpEx)</span>
                <span className="cost-amount">{financialProjections.opexRange || 'N/A'}</span>
                <p className="cost-note">Monthly rental, staff & utilities</p>
              </div>
              <div className="cost-card breakeven">
                <span className="cost-label">Est. Break-Even Timeline</span>
                <span className="cost-amount">{financialProjections.estimatedBreakEven || 'N/A'}</span>
                <p className="cost-note">Months to reach net-positive cash flow</p>
              </div>
            </div>
            {financialProjections.description && (
              <div className="financials-rationale">
                <h5>Strategic Financial Rationale</h5>
                <p>{financialProjections.description}</p>
              </div>
            )}
          </div>
        )}

        {/* RISKS PANEL */}
        {activeTab === 'risks' && hasRisks && (
          <div id="panel-risks" role="tabpanel" aria-labelledby="tab-risks" className="risks-view animate-in">
            <div className="risks-list">
              {riskAssessment.map((risk, idx) => (
                <div key={idx} className="risk-item">
                  <div className="risk-header">
                    <AlertTriangle size={16} className="risk-warning-icon" aria-hidden="true" />
                    <h4>{risk.riskCategory}</h4>
                  </div>
                  <p className="risk-desc">{risk.riskDescription}</p>
                  <div className="risk-mitigation">
                    <span className="mitigation-badge">Mitigation Strategy</span>
                    <p className="mitigation-text">{risk.mitigationStrategy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MARKETING PANEL */}
        {activeTab === 'marketing' && hasMarketing && (
          <div id="panel-marketing" role="tabpanel" aria-labelledby="tab-marketing" className="marketing-view animate-in">
            <div className="marketing-grid">
              {marketingPlaybook.map((play, idx) => (
                <div key={idx} className="marketing-card">
                  <div className="marketing-card-header">
                    <span className="audience-tag">{play.targetAudience}</span>
                    <span className="channel-badge">
                      <ArrowUpRight size={12} aria-hidden="true" style={{ marginRight: '3px' }} />
                      {play.channel}
                    </span>
                  </div>
                  <h5>Strategy & Campaign Tactic</h5>
                  <p>{play.tacticDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default StrategicPlaybookPanel;
