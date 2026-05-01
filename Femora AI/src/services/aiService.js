const COLAB_URL = import.meta.env.VITE_COLAB_BACKEND_URL || '';

export const getAIInsights = async (symptoms, severity) => {
  if (!COLAB_URL) {
    console.warn('Colab Backend URL not configured. Using dummy data.');
    return {
      insights: [
        "Cycle variability increased this month.",
        "Stress and sleep patterns may be affecting hormonal wellness.",
        "Irregular wellness trends detected in late May."
      ],
      score: 58
    };
  }

  try {
    const response = await fetch(`${COLAB_URL}/api/insights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms: symptoms,
        severity: parseInt(severity),
        duration: "30 days"
      }),
    });

    if (!response.ok) throw new Error('Backend response error');
    return await response.json();
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    return null;
  }
};
