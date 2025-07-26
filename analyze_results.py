import pandas as pd

def analyze_results(high_quality_file, low_quality_file):
    """
    Analyzes the simulated test results and prints a summary.
    """
    df_high = pd.read_csv(high_quality_file, header=None, names=[
        "task_completion_time", "errors_encountered", "user_satisfaction_score"
    ])
    df_low = pd.read_csv(low_quality_file, header=None, names=[
        "task_completion_time", "errors_encountered", "user_satisfaction_score"
    ])

    print("\n--- High Quality Results Summary ---")
    print(df_high.describe())
    print("\n--- Low Quality Results Summary ---")
    print(df_low.describe())

    # Calculate percentage improvements/differences
    avg_high_time = df_high["task_completion_time"].mean()
    avg_low_time = df_low["task_completion_time"].mean()
    time_diff_percent = ((avg_low_time - avg_high_time) / avg_low_time) * 100

    avg_high_errors = df_high["errors_encountered"].mean()
    avg_low_errors = df_low["errors_encountered"].mean()
    errors_diff_percent = ((avg_low_errors - avg_high_errors) / avg_low_errors) * 100

    avg_high_satisfaction = df_high["user_satisfaction_score"].mean()
    avg_low_satisfaction = df_low["user_satisfaction_score"].mean()
    satisfaction_diff_percent = ((avg_high_satisfaction - avg_low_satisfaction) / avg_high_satisfaction) * 100

    print("\n--- Impact Analysis ---")
    print(f"Average Task Completion Time (High Quality): {avg_high_time:.2f} seconds")
    print(f"Average Task Completion Time (Low Quality): {avg_low_time:.2f} seconds")
    print(f"High quality leads to {time_diff_percent:.2f}% faster task completion.")

    print(f"\nAverage Errors Encountered (High Quality): {avg_high_errors:.2f}")
    print(f"Average Errors Encountered (Low Quality): {avg_low_errors:.2f}")
    print(f"High quality leads to {errors_diff_percent:.2f}% fewer errors.")

    print(f"\nAverage User Satisfaction Score (High Quality): {avg_high_satisfaction:.2f}")
    print(f"Average User Satisfaction Score (Low Quality): {avg_low_satisfaction:.2f}")
    print(f"High quality leads to {satisfaction_diff_percent:.2f}% higher user satisfaction.")

if __name__ == '__main__':
    analyze_results("high_quality_results.txt", "low_quality_results.txt")
