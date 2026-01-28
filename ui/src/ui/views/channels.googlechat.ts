import { html, nothing } from "lit";
import { msg } from "@lit/localize";

import { formatAgo } from "../format";
import type { GoogleChatStatus } from "../types";
import { renderChannelConfigSection } from "./channels.config";
import type { ChannelsProps } from "./channels.types";

export function renderGoogleChatCard(params: {
  props: ChannelsProps;
  googleChat?: GoogleChatStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, googleChat, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${msg("Google Chat")}</div>
      <div class="card-sub">${msg("Chat API webhook status and channel configuration.")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${msg("Configured")}</span>
          <span>${googleChat ? (googleChat.configured ? msg("Yes") : msg("No")) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Running")}</span>
          <span>${googleChat ? (googleChat.running ? msg("Yes") : msg("No")) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Credential")}</span>
          <span>${googleChat?.credentialSource ?? msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Audience")}</span>
          <span>
            ${googleChat?.audienceType
              ? `${googleChat.audienceType}${googleChat.audience ? ` · ${googleChat.audience}` : ""}`
              : msg("n/a")}
          </span>
        </div>
        <div>
          <span class="label">${msg("Last start")}</span>
          <span>${googleChat?.lastStartAt ? formatAgo(googleChat.lastStartAt) : msg("n/a")}</span>
        </div>
        <div>
          <span class="label">${msg("Last probe")}</span>
          <span>${googleChat?.lastProbeAt ? formatAgo(googleChat.lastProbeAt) : msg("n/a")}</span>
        </div>
      </div>

      ${googleChat?.lastError
        ? html`<div class="callout danger" style="margin-top: 12px;">
            ${googleChat.lastError}
          </div>`
        : nothing}

      ${googleChat?.probe
        ? html`<div class="callout" style="margin-top: 12px;">
            ${msg("Probe")} ${googleChat.probe.ok ? msg("ok") : msg("failed")} ·
            ${googleChat.probe.status ?? ""} ${googleChat.probe.error ?? ""}
          </div>`
        : nothing}

      ${renderChannelConfigSection({ channelId: "googlechat", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${msg("Probe")}
        </button>
      </div>
    </div>
  `;
}
