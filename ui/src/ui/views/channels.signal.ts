import { html, nothing } from "lit";
import { msg } from "@lit/localize";

import { formatAgo } from "../format";
import type { SignalStatus } from "../types";
import type { ChannelsProps } from "./channels.types";
import { renderChannelConfigSection } from "./channels.config";

export function renderSignalCard(params: {
  props: ChannelsProps;
  signal?: SignalStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, signal, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${msg("Signal")}</div>
      <div class="card-sub">${msg("signal-cli status and channel configuration.")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${msg("Configured")}</span>
          <span>${signal?.configured ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Running")}</span>
          <span>${signal?.running ? msg("Yes") : msg("No")}</span>
        </div>
        <div>
          <span class="label">${msg("Base URL")}</span>
          <span>${signal?.baseUrl ?? msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Last start")}</span>
          <span>${signal?.lastStartAt ? formatAgo(signal.lastStartAt) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Last probe")}</span>
          <span>${signal?.lastProbeAt ? formatAgo(signal.lastProbeAt) : msg("n/a")}</span>
        </div>
      </div>

      ${signal?.lastError
        ? html`<div class="callout danger" style="margin-top: 12px;">
            ${signal.lastError}
          </div>`
        : nothing}

      ${signal?.probe
        ? html`<div class="callout" style="margin-top: 12px;">
            ${msg("Probe")} ${signal.probe.ok ? msg("ok") : msg("failed")} ·
            ${signal.probe.status ?? ""} ${signal.probe.error ?? ""}
          </div>`
        : nothing}

      ${renderChannelConfigSection({ channelId: "signal", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${msg("Probe")}
        </button>
      </div>
    </div>
  `;
}
