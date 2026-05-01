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
    const response = await fetch(`${COLAB_URL}/chatbot/predict-pcos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symptoms: symptoms,
        user_metrics: {
          severity: parseInt(severity),
          duration: "30 days"
        }
      }),
    });

    if (!response.ok) throw new Error('Backend response error');
    const result = await response.json();
    return result.data; // Return the 'data' part of the FastAPI response
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    return null;
  }
};

export const logCycleData = async (data) => {
  if (!COLAB_URL) return { status: 'success' };

  try {
    const response = await fetch(`${COLAB_URL}/cycle/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error logging cycle:', error);
    return null;
  }
};
