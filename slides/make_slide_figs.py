"""Figures used only in the slides (not in the report).

Run from the repository root:  python slides/make_slide_figs.py
Writes figs/slide_*.png. Data for the swarm-step figure come from
results/swarm_states_sphere_seed42.csv (team experiment, seed 42).
"""
import os
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

NAVY, TEAL, ORANGE, RED, GREY, LIGHT = "#1B2A41", "#2E7D8C", "#F2A541", "#C8553D", "#5C6F82", "#8FB8C4"
plt.rcParams.update({"font.family": "Calibri", "font.size": 12, "axes.edgecolor": GREY,
                     "axes.labelcolor": NAVY, "xtick.color": GREY, "ytick.color": GREY})
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIG = os.path.join(ROOT, "figs")


def rastrigin(x, y):
    return 20 + x**2 - 10*np.cos(2*np.pi*x) + y**2 - 10*np.cos(2*np.pi*y)


def sphere(x, y):
    return x**2 + y**2


def save(fig, name):
    fig.savefig(os.path.join(FIG, name), dpi=200, bbox_inches="tight", transparent=False, facecolor="white")
    plt.close(fig)


# 1. Intro landscape: 1-D slice of Rastrigin, a downhill local search stuck in a local minimum
def fig_landscape():
    x = np.linspace(-4.6, 4.6, 2000)
    f = 10 + x**2 - 10*np.cos(2*np.pi*x)
    fig, ax = plt.subplots(figsize=(6.4, 4.2))
    ax.fill_between(x, f, -9, color=LIGHT, alpha=0.35)
    ax.plot(x, f, color=NAVY, lw=2)
    walk = np.array([-3.45, -3.3, -3.15, -3.02])
    fw = 10 + walk**2 - 10*np.cos(2*np.pi*walk)
    for i in range(len(walk) - 1):
        ax.annotate("", xy=(walk[i+1], fw[i+1] + 1.2), xytext=(walk[i], fw[i] + 1.2),
                    arrowprops=dict(arrowstyle="-|>", color=TEAL, lw=1.8))
    xl = -2.985
    fl = 10 + xl**2 - 10*np.cos(2*np.pi*xl)
    ax.scatter([xl], [fl + 0.8], s=140, color=RED, edgecolor="white", zorder=5)
    ax.text(-3.0, 4.5, "local search stops here\n(local minimum)", color=RED, fontsize=12, ha="center", va="top", weight="bold")
    ax.scatter([0], [0.8], s=330, marker="*", color=ORANGE, edgecolor=NAVY, zorder=5)
    ax.text(0, -1.2, "global minimum\nf = 0 at x = 0", color=NAVY, fontsize=12, ha="center", va="top", weight="bold")
    ax.set_ylim(-9, 42); ax.set_xlim(-4.6, 4.6)
    ax.set_xlabel("x"); ax.set_ylabel("f(x)")
    for sp in ["top", "right"]:
        ax.spines[sp].set_visible(False)
    save(fig, "slide_intro_landscape.png")


# 2. One climber vs a swarm (illustration, not data)
def fig_climber_vs_swarm():
    g = np.linspace(-5, 5, 300)
    X, Y = np.meshgrid(g, g)
    Z = sphere(X - 0.6, Y - 0.4)
    fig, axes = plt.subplots(1, 2, figsize=(10, 4.4))
    for ax in axes:
        ax.contour(X, Y, Z, levels=10, colors=LIGHT, linewidths=0.9)
        ax.set_xlim(-5, 5); ax.set_ylim(-5, 5); ax.set_aspect("equal")
        ax.set_xticks([]); ax.set_yticks([])
    # Hill Climbing: one point, small accepted steps, one rejected step
    ax = axes[0]
    path = np.array([[-3.8, -3.2], [-3.3, -2.9], [-2.9, -2.2], [-2.2, -1.9], [-1.8, -1.2]])
    for a, b in zip(path[:-1], path[1:]):
        ax.annotate("", xy=b, xytext=a, arrowprops=dict(arrowstyle="-|>", color=TEAL, lw=2))
    ax.scatter(path[:, 0], path[:, 1], s=30, color=TEAL, zorder=3)
    ax.scatter(*path[-1], s=120, color=NAVY, zorder=4)
    rej = np.array([-2.4, -0.6])
    ax.annotate("", xy=rej, xytext=path[-1], arrowprops=dict(arrowstyle="-|>", color=RED, lw=1.8, ls="--"))
    ax.text(rej[0] - 0.25, rej[1] + 0.25, "× worse: rejected", color=RED, fontsize=12, ha="center", weight="bold")
    ax.text(-1.5, -1.55, "current point", color=NAVY, fontsize=12)
    ax.set_title("Hill Climbing: one point", color=NAVY, fontsize=15, weight="bold")
    # PSO: swarm, one particle annotated
    ax = axes[1]
    pts = np.array([[-3.5, 2.8], [3.2, 3.4], [3.6, -2.9], [-1.0, -3.6], [-3.2, -1.0]])
    ax.scatter(pts[:, 0], pts[:, 1], s=60, color=GREY, zorder=3)
    xi = np.array([-3.2, -1.0]); vi = np.array([1.5, 1.4])
    pb = np.array([-2.6, 1.0]); gb = np.array([1.2, 1.6])
    ax.scatter(*xi, s=140, color=TEAL, zorder=5)
    ax.annotate("", xy=xi + vi, xytext=xi, arrowprops=dict(arrowstyle="-|>", color=TEAL, lw=2.6))
    ax.plot(*zip(xi, pb), ls=":", color=TEAL, lw=1.6); ax.plot(*zip(xi, gb), ls=":", color=RED, lw=1.6)
    ax.scatter(*pb, s=260, marker="*", facecolor="white", edgecolor=TEAL, lw=2, zorder=5)
    ax.scatter(*gb, s=320, marker="*", color=ORANGE, edgecolor=NAVY, lw=1, zorder=5)
    ax.text(xi[0] - 0.2, xi[1] - 0.75, "$x_i$  position", color=TEAL, fontsize=14, weight="bold")
    ax.text(xi[0] + 0.9, xi[1] - 0.15, "$v_i$  velocity", color=TEAL, fontsize=14, weight="bold")
    ax.text(pb[0] - 1.7, pb[1] + 0.45, "$pbest_i$  own best", color=TEAL, fontsize=14, weight="bold")
    ax.text(gb[0] - 1.3, gb[1] + 0.55, "$gbest$  swarm best", color=RED, fontsize=14, weight="bold")
    ax.set_title("PSO: a swarm with memory", color=NAVY, fontsize=15, weight="bold")
    fig.tight_layout()
    save(fig, "slide_climber_vs_swarm.png")


# 3. Small contour plots of the two test functions
def fig_functions():
    g = np.linspace(-5.12, 5.12, 400)
    X, Y = np.meshgrid(g, g)
    for name, fn, lv in [("sphere", sphere, 12), ("rastrigin", rastrigin, 18)]:
        fig, ax = plt.subplots(figsize=(3.4, 3.0))
        cs = ax.contourf(X, Y, fn(X, Y), levels=lv, cmap="cividis_r")
        ax.scatter([0], [0], s=150, marker="*", color=ORANGE, edgecolor=NAVY, zorder=5)
        ax.set_aspect("equal"); ax.set_xticks([-5, 0, 5]); ax.set_yticks([-5, 0, 5])
        ax.set_xlabel("x₁"); ax.set_ylabel("x₂")
        save(fig, f"slide_func_{name}.png")


# 4. Five particles, iteration 0 -> 1 (team data, seed 42)
def fig_swarm_step():
    d = pd.read_csv(os.path.join(ROOT, "results", "swarm_states_sphere_seed42.csv"))
    s0, s1 = d[d.iteration == 0].set_index("particle"), d[d.iteration == 1].set_index("particle")
    g = np.linspace(-5.5, 5.5, 300)
    X, Y = np.meshgrid(g, g)
    fig, ax = plt.subplots(figsize=(5.2, 5.0))
    ax.contour(X, Y, sphere(X, Y), levels=[1, 4, 9, 16, 25, 36, 49], colors=LIGHT, linewidths=0.9)
    ax.add_patch(plt.Rectangle((-5.12, -5.12), 10.24, 10.24, fill=False, ec=GREY, lw=1.2, ls="--"))
    for p in s0.index:
        a = (s0.loc[p, "x1"], s0.loc[p, "x2"]); b = (s1.loc[p, "x1"], s1.loc[p, "x2"])
        better = s1.loc[p, "f(x)"] < s0.loc[p, "f(x)"]
        col = TEAL if better else RED
        ax.annotate("", xy=b, xytext=a, arrowprops=dict(arrowstyle="-|>", color=col, lw=1.6, alpha=0.9))
        ax.scatter(*a, s=55, facecolor="white", edgecolor=NAVY, lw=1.4, zorder=4)
        ax.scatter(*b, s=55, color=col, zorder=4)
        ax.text(a[0] + 0.15, a[1] + 0.25, f"P{p}", color=NAVY, fontsize=12, weight="bold")
    ax.scatter(s0.iloc[0]["gbest1"], s0.iloc[0]["gbest2"], s=260, marker="*", facecolor="none", edgecolor=NAVY, lw=1.5, zorder=6)
    ax.scatter(s1.iloc[0]["gbest1"], s1.iloc[0]["gbest2"], s=300, marker="*", color=ORANGE, edgecolor=NAVY, zorder=6)
    ax.set_xlim(-5.6, 5.6); ax.set_ylim(-5.6, 5.6); ax.set_aspect("equal")
    ax.set_xlabel("x₁"); ax.set_ylabel("x₂")
    from matplotlib.lines import Line2D
    h = [Line2D([], [], marker="o", ls="", mfc="white", mec=NAVY, label="iteration 0"),
         Line2D([], [], color=TEAL, marker="o", label="iteration 1, better"),
         Line2D([], [], color=RED, marker="o", label="iteration 1, worse"),
         Line2D([], [], marker="*", ls="", mfc="none", mec=NAVY, ms=12, label="gbest iter 0 (8.26)"),
         Line2D([], [], marker="*", ls="", color=ORANGE, mec=NAVY, ms=13, label="gbest iter 1 (0.37)"),
         Line2D([], [], color=GREY, ls="--", label="domain boundary")]
    ax.legend(handles=h, loc="upper center", bbox_to_anchor=(0.5, -0.12), ncol=2, fontsize=10, frameon=False)
    save(fig, "slide_swarm_step01.png")


if __name__ == "__main__":
    fig_landscape(); fig_climber_vs_swarm(); fig_functions(); fig_swarm_step()
    print("done")
