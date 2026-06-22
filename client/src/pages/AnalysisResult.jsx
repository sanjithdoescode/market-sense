import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import CompetitorTable from '../components/CompetitorTable.jsx';
import DemandSignalPanel from '../components/DemandSignalPanel.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import RecommendationPanel from '../components/RecommendationPanel.jsx';
import ScoreCard from '../components/ScoreCard.jsx';
import StrategicPlaybookPanel from '../components/StrategicPlaybookPanel.jsx';
import LiquidGlass from '../components/LiquidGlass.jsx';
import { useAnalysis } from '../hooks/useAnalysis.js';

function AnalysisResult() {
  const { id } = useParams();
  const { loadAnalysis, state } = useAnalysis();
  const analysisDocument = state.currentAnalysis;

  useEffect(() => {
    if (!analysisDocument || analysisDocument.id !== id) {
      loadAnalysis(id).catch(() => undefined);
    }
  }, [analysisDocument, id, loadAnalysis]);

  if (state.loading && (!analysisDocument || analysisDocument.id !== id)) {
    return <LoadingSpinner label="Loading analysis" />;
  }

  if (state.error && (!analysisDocument || analysisDocument.id !== id)) {
    return <div className="error-banner">{state.error}</div>;
  }

  if (!analysisDocument) {
    return null;
  }

  const {
    analysis,
    competitors,
    input,
    metadata,
    demandScore,
    supplyScore,
    opportunityScore,
    opportunityTier,
    audienceCategories,
    demandSignals
  } = analysisDocument;

  return (
    <div className="result-page">
      <div className="page-actions" style={{ justifyContent: 'space-between', display: 'flex', width: '100%', gap: '16px' }}>
        <LiquidGlass
          tagName={Link}
          to="/"
          className="secondary-button liquid-glass"
          depth={15}
          blur={8}
          tint={0.06}
          tintColor="#ffffff"
          glint={20}
          hoverParams={{
            depth: 22,
            glint: 35,
            tint: 0.1
          }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          New analysis
        </LiquidGlass>
        <LiquidGlass
          tagName={Link}
          to={`/chat?analysisId=${id}`}
          className="primary-button liquid-glass"
          style={{ minHeight: '40px', padding: '8px 16px', fontSize: '0.88rem' }}
          depth={20}
          blur={10}
          tint={0.12}
          tintColor="var(--accent-dim)"
          glint={30}
          hoverParams={{
            depth: 28,
            glint: 45,
            tint: 0.18
          }}
        >
          <MessageSquare size={16} aria-hidden="true" />
          Discuss report with AI
        </LiquidGlass>
      </div>

      <section className="result-header">
        <div>
          <p className="eyebrow">{input.businessType}</p>
          <h1>{input.location}</h1>
          {input.niche && <p>{input.niche}</p>}
        </div>
      </section>

      {/* Score cards — now includes demand, supply, opportunity */}
      <ScoreCard
        analysis={analysis}
        demandScore={demandScore}
        supplyScore={supplyScore}
        opportunityScore={opportunityScore}
        opportunityTier={opportunityTier}
      />

      {/* Evidence warnings */}
      {metadata?.evidenceWarnings?.length > 0 && (
        <section className="evidence-strip" aria-label="Evidence warnings">
          {metadata.evidenceWarnings.map((warning) => (
            <span key={warning}>{warning}</span>
          ))}
        </section>
      )}

      {/* Demand Signal map */}
      <DemandSignalPanel
        audienceCategories={audienceCategories}
        demandSignals={demandSignals}
        demandScore={demandScore}
      />

      {/* Recommendation + AI interpretations */}
      <RecommendationPanel
        recommendation={analysis.recommendation}
        summary={analysis.summary}
        marketAnalysis={analysis.marketAnalysis}
        demandAnalysis={analysis.demandAnalysis}
        supplyAnalysis={analysis.supplyAnalysis}
        opportunityAnalysis={analysis.opportunityAnalysis}
        audienceInsights={analysis.audienceInsights}
        competitorInsights={analysis.competitorInsights}
        pricingAnalysis={analysis.pricingAnalysis}
      />

      {/* Premium Strategic Business Playbook */}
      <StrategicPlaybookPanel
        swotAnalysis={analysis.swotAnalysis}
        financialProjections={analysis.financialProjections}
        riskAssessment={analysis.riskAssessment}
        marketingPlaybook={analysis.marketingPlaybook}
        implementationRoadmap={analysis.implementationRoadmap}
      />

      {/* Competitor table */}
      <CompetitorTable competitors={competitors} assessment={analysis.competitorAssessment} />
    </div>
  );
}

export default AnalysisResult;
